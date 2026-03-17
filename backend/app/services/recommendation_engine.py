from sqlalchemy.orm import Session
from app.models.finding import Finding
from app.models.recommendation import Recommendation, RecommendationPriority
from typing import List

class RecommendationEngine:
    def __init__(self, db: Session):
        self.db = db
        # Mapping: Finding Title Substring -> Recommendation Data
        self.rules = {
            "Missing HSTS": {
                "priority": "High",
                "effort": "Low",
                "impact": "Prevents Man-in-the-Middle attacks.",
                "guidance": "Add the 'Strict-Transport-Security' header to your web server configuration."
            },
            "Missing CSP": {
                "priority": "Medium",
                "effort": "Medium",
                "impact": "Prevents Cross-Site Scripting (XSS).",
                "guidance": "Define a Content-Security-Policy header and restrict source domains."
            },
            "Missing X-Frame-Options": {
                "priority": "Medium",
                "effort": "Low",
                "impact": "Prevents Clickjacking.",
                "guidance": "Add 'X-Frame-Options: DENY' or 'SAMEORIGIN' to headers."
            }
        }

    def generate_recommendations(self, assessment_id: int):
        findings = self.db.query(Finding).filter(Finding.assessment_id == assessment_id).all()
        
        for finding in findings:
            # Simple rule matching
            match = None
            for key in self.rules:
                if key in finding.title:
                    match = self.rules[key]
                    break
            
            if match:
                db_rec = Recommendation(
                    finding_id=finding.id,
                    assessment_id=assessment_id,
                    title=f"Fix {finding.title}",
                    priority=match["priority"],
                    effort=match["effort"],
                    business_impact=match["impact"],
                    technical_guidance=match["guidance"]
                )
                self.db.add(db_rec)
        
        self.db.commit()
