from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.db.session import get_db
from app.models.question import QuestionnaireQuestion
from app.models.response import QuestionnaireResponse
from app.models.assessment import Assessment
from pydantic import BaseModel

router = APIRouter()

class ResponseIn(BaseModel):
    question_id: int
    answer: str
    notes: Optional[str] = None

class QuestionnaireSubmission(BaseModel):
    assessment_id: int
    responses: List[ResponseIn]

@router.get("/questions", response_model=List[Any])
def get_questions(db: Session = Depends(get_db)) -> Any:
    return db.query(QuestionnaireQuestion).all()

@router.post("/submit")
def submit_responses(
    *,
    db: Session = Depends(get_db),
    submission: QuestionnaireSubmission,
    current_user: deps.User = Depends(deps.get_current_active_user)
) -> Any:
    asm = db.query(Assessment).filter(Assessment.id == submission.assessment_id).first()
    if not asm:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    for resp in submission.responses:
        db_resp = QuestionnaireResponse(
            assessment_id=submission.assessment_id,
            question_id=resp.question_id,
            answer=resp.answer,
            notes=resp.notes
        )
        db.add(db_resp)
    
    db.commit()
    return {"message": "Responses submitted successfully"}
