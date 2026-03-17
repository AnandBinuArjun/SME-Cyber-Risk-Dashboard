from sqlalchemy.orm import Session
from app.models.assessment import Assessment
from app.models.finding import Finding
from app.models.recommendation import Recommendation
from app.models.organization import Organization
from app.models.user import User
from typing import Dict, Any
from datetime import datetime
import io

# Mock PDF generator for now (in real scenario, we'd use xhtml2pdf or similar)
class ReportService:
    def __init__(self, db: Session):
        self.db = db

    def generate_assessment_report(self, assessment_id: int) -> bytes:
        asm = self.db.query(Assessment).filter(Assessment.id == assessment_id).first()
        if not asm:
            return b""

        org = self.db.query(Organization).filter(Organization.id == asm.organization_id).first()
        findings = self.db.query(Finding).filter(Finding.assessment_id == assessment_id).all()
        recs = self.db.query(Recommendation).filter(Recommendation.assessment_id == assessment_id).all()

        # In a real implementation, we would render an HTML template here
        # For now, let's create a structured text summary as a placeholder
        report_content = f"""
        SME CYBER RISK DASHBOARD - ASSESSMENT REPORT
        ---------------------------------------------
        Organization: {org.name}
        Domain: {org.domain}
        Date: {asm.created_at.strftime("%Y-%m-%d")}
        Overall Risk Score: {asm.overall_score:.1f} / 100
        Severity Level: {asm.severity}

        EXECUTIVE SUMMARY
        -----------------
        Total Findings: {len(findings)}
        Critical Risks: {len([f for f in findings if f.severity.lower() == "critical"])}
        High Risks: {len([f for f in findings if f.severity.lower() == "high"])}

        DETAILED FINDINGS
        -----------------
        """
        for finding in findings:
            report_content += f"\n- {finding.title} ({finding.severity.upper()})\n  Category: {finding.category}\n  Details: {finding.description}\n"

        report_content += "\nREMEDIATION ROADMAP\n-------------------"
        for rec in recs:
            report_content += f"\n- {rec.title} (Priority: {rec.priority})\n  Guidance: {rec.technical_guidance}\n"

        # Simulating returning report as bytes (PDF generation logic would go here)
        return report_content.encode("utf-8")
