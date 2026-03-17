from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.db.session import get_db
from app.models.assessment import Assessment, AssessmentStatus
from app.models.organization import Organization
from app.models.user import User, UserRole
from app.schemas.assessment import AssessmentCreate, AssessmentOut, AssessmentUpdate

router = APIRouter()

@router.post("/", response_model=AssessmentOut)
def create_assessment(
    *,
    db: Session = Depends(get_db),
    asm_in: AssessmentCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    # Verify organization existence and ownership
    org = db.query(Organization).filter(Organization.id == asm_in.organization_id).first()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    if current_user.role != UserRole.SUPER_ADMIN and org.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions for this organization")
    
    db_asm = Assessment(
        **asm_in.model_dump(),
        created_by=current_user.id,
        status=AssessmentStatus.PENDING
    )
    db.add(db_asm)
    db.commit()
    db.refresh(db_asm)
    return db_asm

@router.get("/", response_model=List[AssessmentOut])
def read_assessments(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    organization_id: Optional[int] = None,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    query = db.query(Assessment)
    if organization_id:
        # Check permission for this specific org
        org = db.query(Organization).filter(Organization.id == organization_id).first()
        if not org or (current_user.role != UserRole.SUPER_ADMIN and org.owner_id != current_user.id):
            raise HTTPException(status_code=403, detail="Not enough permissions")
        query = query.filter(Assessment.organization_id == organization_id)
    elif current_user.role != UserRole.SUPER_ADMIN:
        # Filter by orgs the user owns
        org_ids = [org.id for org in db.query(Organization).filter(Organization.owner_id == current_user.id).all()]
        query = query.filter(Assessment.organization_id.in_(org_ids))
    
    return query.offset(skip).limit(limit).all()

@router.get("/{id}", response_model=AssessmentOut)
def read_assessment(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    asm = db.query(Assessment).filter(Assessment.id == id).first()
    if not asm:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    # Check org permission
    org = db.query(Organization).filter(Organization.id == asm.organization_id).first()
    if current_user.role != UserRole.SUPER_ADMIN and org.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return asm

@router.put("/{id}", response_model=AssessmentOut)
def update_assessment(
    *,
    db: Session = Depends(get_db),
    id: int,
    asm_in: AssessmentUpdate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    asm = db.query(Assessment).filter(Assessment.id == id).first()
    if not asm:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    # Check org permission
    org = db.query(Organization).filter(Organization.id == asm.organization_id).first()
    if current_user.role != UserRole.SUPER_ADMIN and org.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    update_data = asm_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(asm, field, value)
    
    db.add(asm)
    db.commit()
    db.refresh(asm)
    return asm
