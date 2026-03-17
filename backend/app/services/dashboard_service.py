from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.assessment import Assessment
from app.models.finding import Finding, FindingSeverity
from app.models.organization import Organization
from typing import Dict, Any

class DashboardService:
    def __init__(self, db: Session):
        self.db = db

    def get_executive_summary(self, organization_id: int) -> Dict[str, Any]:
        # Get latest assessment
        latest_asm = self.db.query(Assessment).filter(
            Assessment.organization_id == organization_id
        ).order_by(Assessment.created_at.desc()).first()

        if not latest_asm:
            return {"message": "No assessments found"}

        # Findings count by severity
        severity_counts = self.db.query(
            Finding.severity, func.count(Finding.id)
        ).filter(
            Finding.assessment_id == latest_asm.id
        ).group_by(Finding.severity).all()

        findings_summary = {s: c for s, c in severity_counts}

        # Trend (last 5 assessments)
        trend = self.db.query(
            Assessment.created_at, Assessment.overall_score
        ).filter(
            Assessment.organization_id == organization_id
        ).order_by(Assessment.created_at.asc()).limit(5).all()

        return {
            "organization_id": organization_id,
            "latest_assessment": {
                "id": latest_asm.id,
                "score": latest_asm.overall_score,
                "severity": latest_asm.severity,
                "date": latest_asm.created_at
            },
            "findings_count": findings_summary,
            "score_trend": [{"date": t[0], "score": t[1]} for t in trend]
        }
