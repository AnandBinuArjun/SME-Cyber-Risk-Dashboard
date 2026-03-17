from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.services.dashboard_service import DashboardService
from app.models.user import User

router = APIRouter()

@router.get("/{organization_id}/summary")
def get_dashboard_summary(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    service = DashboardService(db)
    summary = service.get_executive_summary(organization_id)
    return summary
