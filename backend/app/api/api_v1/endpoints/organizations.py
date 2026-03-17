from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.db.session import get_db
from app.models.organization import Organization
from app.models.user import User, UserRole
from app.schemas.organization import OrganizationCreate, OrganizationOut, OrganizationUpdate

router = APIRouter()

@router.post("/", response_model=OrganizationOut)
def create_organization(
    *,
    db: Session = Depends(get_db),
    org_in: OrganizationCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    # Check if domain already has an organization (for this user or globally depending on requirements)
    existing = db.query(Organization).filter(Organization.domain == org_in.domain).first()
    if existing:
        raise HTTPException(status_code=400, detail="Organization with this domain already exists")
    
    db_org = Organization(
        **org_in.model_dump(),
        owner_id=current_user.id
    )
    db.add(db_org)
    db.commit()
    db.refresh(db_org)
    return db_org

@router.get("/", response_model=List[OrganizationOut])
def read_organizations(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    if current_user.role == UserRole.SUPER_ADMIN:
        return db.query(Organization).offset(skip).limit(limit).all()
    else:
        return db.query(Organization).filter(Organization.owner_id == current_user.id).offset(skip).limit(limit).all()

@router.get("/{id}", response_model=OrganizationOut)
def read_organization(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    org = db.query(Organization).filter(Organization.id == id).first()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    if current_user.role != UserRole.SUPER_ADMIN and org.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return org

@router.put("/{id}", response_model=OrganizationOut)
def update_organization(
    *,
    db: Session = Depends(get_db),
    id: int,
    org_in: OrganizationUpdate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    org = db.query(Organization).filter(Organization.id == id).first()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    if current_user.role != UserRole.SUPER_ADMIN and org.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    update_data = org_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(org, field, value)
    
    db.add(org)
    db.commit()
    db.refresh(org)
    return org
