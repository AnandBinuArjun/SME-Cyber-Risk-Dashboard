from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum
from app.db.session import Base
import enum

class RecommendationPriority(str, enum.Enum):
    IMMEDIATE = "Immediate"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False)
    finding_id = Column(Integer, ForeignKey("findings.id"), nullable=True)
    
    title = Column(String, nullable=False)
    priority = Column(String, nullable=False)
    effort = Column(String) # Low, Medium, High
    business_impact = Column(Text)
    technical_guidance = Column(Text)
    
    status = Column(String, default="open") # open, in_progress, resolved

    # Relationships
    # assessment = relationship("Assessment", back_populates="recommendations")
    # finding = relationship("Finding", back_populates="recommendations")
