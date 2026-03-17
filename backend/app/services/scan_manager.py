from typing import List
from sqlalchemy.orm import Session
from datetime import datetime

from app.models.scan import Scan, ScanType
from app.models.finding import Finding
from app.models.assessment import Assessment, AssessmentStatus
from app.services.scanners.headers import SecurityHeadersScanner

class ScanManager:
    def __init__(self, db: Session):
        self.db = db
        self.scanners = [
            SecurityHeadersScanner()
            # Add more scanners here as they are implemented
        ]

    def run_all_scans(self, assessment_id: int):
        assessment = self.db.query(Assessment).filter(Assessment.id == assessment_id).first()
        if not assessment:
            return
        
        assessment.status = AssessmentStatus.SCANNING
        self.db.commit()

        # Get parent domain
        from app.models.organization import Organization
        org = self.db.query(Organization).filter(Organization.id == assessment.organization_id).first()
        domain = org.domain

        for scanner in self.scanners:
            # Create Scan entry
            db_scan = Scan(
                assessment_id=assessment_id,
                scan_type=scanner.name,
                status="running"
            )
            self.db.add(db_scan)
            self.db.commit()
            self.db.refresh(db_scan)

            # Perform scan
            raw_results = scanner.scan(domain)
            db_scan.raw_results = raw_results
            db_scan.status = "completed"
            db_scan.completed_at = datetime.utcnow()
            self.db.commit()

            # Process findings
            findings_data = scanner.process_findings(assessment_id, db_scan.id, raw_results)
            for f_data in findings_data:
                db_finding = Finding(**f_data)
                self.db.add(db_finding)
            
            self.db.commit()

        assessment.status = AssessmentStatus.ANALYZING
        self.db.commit()
