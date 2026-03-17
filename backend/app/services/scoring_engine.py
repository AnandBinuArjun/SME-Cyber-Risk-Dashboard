from sqlalchemy.orm import Session
from app.models.assessment import Assessment, AssessmentStatus
from app.models.finding import Finding, FindingSeverity
from app.models.response import QuestionnaireResponse
from app.models.question import QuestionnaireQuestion
from typing import Dict, Any

class ScoringEngine:
    def __init__(self, db: Session):
        self.db = db
        self.category_weights = {
            "Web Security": 0.20,
            "Email Security": 0.15,
            "Access Control": 0.20,
            "Backup & Recovery": 0.20,
            "Awareness & Policies": 0.15,
            "Endpoint Security": 0.10
        }

    def calculate_score(self, assessment_id: int) -> Dict[str, Any]:
        assessment = self.db.query(Assessment).filter(Assessment.id == assessment_id).first()
        if not assessment:
            return {}

        # 1. Start with 100 (Perfect Score)
        total_score = 100.0
        category_scores = {cat: 100.0 for cat in self.category_weights.keys()}

        # 2. Subtract for Findings (External Scans)
        # Severity deductions
        deductions = {
            "critical": 20,
            "high": 10,
            "medium": 5,
            "low": 2
        }

        findings = self.db.query(Finding).filter(Finding.assessment_id == assessment_id).all()
        for finding in findings:
            loss = deductions.get(finding.severity.lower(), 0)
            if finding.category in category_scores:
                category_scores[finding.category] -= loss
            else:
                # Default to Web Security if mismatch
                category_scores["Web Security"] -= loss

        # 3. Subtract for Questionnaire (Internal Security)
        responses = self.db.query(QuestionnaireResponse).filter(QuestionnaireResponse.assessment_id == assessment_id).all()
        for resp in responses:
            question = self.db.query(QuestionnaireQuestion).filter(QuestionnaireQuestion.id == resp.question_id).first()
            if resp.answer == "No":
                # Assuming "No" is bad for security questions
                loss = 10 * question.weight
                if question.category in category_scores:
                    category_scores[question.category] -= loss

        # 4. Clamp category scores between 0 and 100
        for cat in category_scores:
            category_scores[cat] = max(0.0, min(100.0, category_scores[cat]))

        # 5. Calculate Weighted overall score
        weighted_total = 0.0
        for cat, weight in self.category_weights.items():
            weighted_total += category_scores[cat] * weight

        # 6. Determine Severity
        if weighted_total > 85:
            severity = "Low"
        elif weighted_total > 60:
            severity = "Medium"
        elif weighted_total > 30:
            severity = "High"
        else:
            severity = "Critical"

        # Update assessment
        assessment.overall_score = weighted_total
        assessment.severity = severity
        assessment.status = AssessmentStatus.COMPLETED
        self.db.commit()

        return {
            "overall_score": weighted_total,
            "severity": severity,
            "category_scores": category_scores
        }
