from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.services.report_service import ReportService
from app.models.user import User

router = APIRouter()

@router.get("/{assessment_id}/download")
def download_report(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    # Permission checks would go here (verify org ownership)
    service = ReportService(db)
    report_data = service.generate_assessment_report(assessment_id)
    
    if not report_data:
        raise HTTPException(status_code=404, detail="Report generation failed")
        
    return Response(
        content=report_data,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=assessment_report_{assessment_id}.pdf"}
    )
