from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base
import enum

class AssessmentStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    SCANNING = "scanning"
    ANALYZING = "analyzing"
    COMPLETED = "completed"
    FAILED = "failed"

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    status = Column(String, default=AssessmentStatus.PENDING)
    overall_score = Column(Float, default=0.0)
    severity = Column(String) # Low, Medium, High, Critical
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    # organization = relationship("Organization", back_populates="assessments")
    # creator = relationship("User", back_populates="assessments_created")
    # scans = relationship("Scan", back_populates="assessment")
    # findings = relationship("Finding", back_populates="assessment")
    # responses = relationship("QuestionnaireResponse", back_populates="assessment")
