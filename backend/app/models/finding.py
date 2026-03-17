from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base
import enum

class FindingSeverity(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class Finding(Base):
    __tablename__ = "findings"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False)
    scan_id = Column(Integer, ForeignKey("scans.id"), nullable=True) # If it came from a scan
    
    category = Column(String, nullable=False) # e.g., "Web Security", "Email Security"
    title = Column(String, nullable=False)
    description = Column(Text)
    severity = Column(String, nullable=False)
    risk_score = Column(Float, default=0.0)
    
    affected_asset = Column(String) # e.g., the domain or header name
    technical_details = Column(Text)
    
    status = Column(String, default="open") # open, in_progress, resolved, accepted
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    # assessment = relationship("Assessment", back_populates="findings")
    # scan = relationship("Scan", back_populates="findings")
    # recommendations = relationship("Recommendation", back_populates="finding")
