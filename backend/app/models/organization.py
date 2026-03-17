from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base
import enum

class CompanySize(str, enum.Enum):
    SMALL = "1-50"
    MEDIUM = "51-250"
    LARGE = "251-1000"
    ENTERPRISE = "1000+"

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    domain = Column(String, index=True, nullable=False)
    industry = Column(String)
    company_size = Column(String)
    employee_count = Column(Integer)
    country = Column(String)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    # owner = relationship("User", back_populates="organizations")
    # assessments = relationship("Assessment", back_populates="organization")
