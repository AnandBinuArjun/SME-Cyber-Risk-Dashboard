from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
from app.models.assessment import AssessmentStatus

class AssessmentBase(BaseModel):
    name: str
    organization_id: int

class AssessmentCreate(AssessmentBase):
    pass

class AssessmentUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[AssessmentStatus] = None
    overall_score: Optional[float] = None
    severity: Optional[str] = None

class AssessmentOut(AssessmentBase):
    id: int
    created_by: int
    status: AssessmentStatus
    overall_score: float
    severity: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
