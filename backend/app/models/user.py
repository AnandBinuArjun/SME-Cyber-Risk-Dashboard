from sqlalchemy import Column, Integer, String, Boolean, Enum, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base
import enum

class UserRole(str, enum.Enum):
    SUPER_ADMIN = "super_admin"
    ORG_OWNER = "org_owner"
    SECURITY_ANALYST = "security_analyst"
    VIEWER = "viewer"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default=UserRole.VIEWER)
    is_active = Column(Boolean(), default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    # organizations = relationship("Organization", back_populates="owner")
    # assessments_created = relationship("Assessment", back_populates="creator")
