from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base
import enum

class ScanType(str, enum.Enum):
    SSL_TLS = "ssl_tls"
    SECURITY_HEADERS = "security_headers"
    DNS_RECORDS = "dns_records"
    EMAIL_SECURITY = "email_security"

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False)
    scan_type = Column(String, nullable=False)
    status = Column(String, default="pending")
    
    raw_results = Column(JSON) # Store raw JSON from external checks
    
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)

    # Relationships
    # assessment = relationship("Assessment", back_populates="scans")
    # findings = relationship("Finding", back_populates="scan")
