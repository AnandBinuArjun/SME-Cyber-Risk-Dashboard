import sys
import os
from datetime import datetime, timedelta

# Add the current directory and 'backend' to sys.path
sys.path.append(os.getcwd())
if os.path.exists("backend"):
    sys.path.append(os.path.join(os.getcwd(), "backend"))

from app.db.session import SessionLocal, Base, engine
from app.models.user import User, UserRole
from app.models.organization import Organization
from app.models.assessment import Assessment, AssessmentStatus
from app.models.finding import Finding
from app.models.scan import Scan
from app.models.question import QuestionnaireQuestion
from app.models.response import QuestionnaireResponse
from app.models.recommendation import Recommendation
from app.core.security import get_password_hash

def seed_db():
    db = SessionLocal()
    
    # 0. Clean database (Optional - be careful with this)
    # Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    print("Seeding database for demo: BrightPath Consulting Ltd...")

    # 1. Create Users
    users = [
        {
            "full_name": "Admin User",
            "email": "admin@platform.com",
            "password": "password123",
            "role": UserRole.SUPER_ADMIN
        },
        {
            "full_name": "Sarah Business",
            "email": "sarah@brightpath.com",
            "password": "password123",
            "role": UserRole.ORG_OWNER
        },
        {
            "full_name": "Alex Tech",
            "email": "alex@brightpath.com",
            "password": "password123",
            "role": UserRole.SECURITY_ANALYST
        },
        {
            "full_name": "Tom Auditor",
            "email": "tom@external.com",
            "password": "password123",
            "role": UserRole.VIEWER
        }
    ]

    db_users = []
    for u in users:
        user = db.query(User).filter(User.email == u["email"]).first()
        if not user:
            user = User(
                full_name=u["full_name"],
                email=u["email"],
                hashed_password=get_password_hash(u["password"]),
                role=u["role"]
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        db_users.append(user)

    owner = db_users[1]
    analyst = db_users[2]

    # 2. Create Organization
    org = db.query(Organization).filter(Organization.domain == "brightpath.com").first()
    if not org:
        org = Organization(
            name="BrightPath Consulting Ltd",
            domain="brightpath.com",
            industry="Professional Services",
            company_size="1-50",
            employee_count=45,
            country="United Kingdom",
            owner_id=owner.id
        )
        db.add(org)
        db.commit()
        db.refresh(org)

    # 3. Create Questionnaire Questions (Bank)
    q_bank = [
        ("Access Control", "Is multi-factor authentication (MFA) enabled for all remote access?", "boolean", 2),
        ("Backup & Recovery", "Are backups performed daily and stored offsite or in the cloud?", "boolean", 2),
        ("Backup & Recovery", "Have you tested a full system restoration in the last 6 months?", "boolean", 3),
        ("Employee Awareness", "Do all employees receive security awareness training upon hire?", "boolean", 1),
        ("Endpoint Security", "Is endpoint protection (Antivirus/EDR) deployed on all company devices?", "boolean", 2),
        ("Incident Response", "Does the company have a formal incident response plan documented?", "boolean", 3),
    ]

    db_questions = []
    for cat, text, q_type, weight in q_bank:
        q = db.query(QuestionnaireQuestion).filter(QuestionnaireQuestion.text == text).first()
        if not q:
            q = QuestionnaireQuestion(category=cat, text=text, question_type=q_type, weight=weight)
            db.add(q)
            db.commit()
            db.refresh(q)
        db_questions.append(q)

    # 4. Assessment 1: Risky Baseline (30 days ago)
    asm1 = Assessment(
        name="Q1 Baseline Assessment",
        organization_id=org.id,
        created_by=owner.id,
        status=AssessmentStatus.COMPLETED,
        overall_score=38.5,
        severity="High",
        created_at=datetime.utcnow() - timedelta(days=30)
    )
    db.add(asm1)
    db.commit()
    db.refresh(asm1)

    # Findings for Asm 1
    findings1 = [
        ("Web Security", "Missing HSTS Header", "HTTP Strict Transport Security is not enabled.", "High", "acme.com", "No 'Strict-Transport-Security' header found."),
        ("Web Security", "Missing CSP Policy", "Content Security Policy is missing.", "Medium", "acme.com", "No 'Content-Security-Policy' header found."),
        ("Email Security", "No DMARC Policy", "Domain-based Message Authentication Reporting and Conformance (DMARC) is not configured.", "High", "brightpath.com", "No _dmarc TXT record found."),
        ("Web Security", "SSL Certificate Expiring Soon", "The SSL certificate for brightpath.com expires in 21 days.", "Medium", "brightpath.com", "Expiration date: 2024-04-05"),
    ]

    for cat, title, desc, sev, asset, tech in findings1:
        f = Finding(
            assessment_id=asm1.id, category=cat, title=title, description=desc, 
            severity=sev, affected_asset=asset, technical_details=tech, status="open"
        )
        db.add(f)
    
    # Responses for Asm 1 (Bad responses)
    responses1 = [
        (db_questions[0].id, "No", "Only IT team has MFA."),
        (db_questions[1].id, "Yes", "Cloud backup enabled."),
        (db_questions[2].id, "No", "Restoration never tested."),
        (db_questions[3].id, "No", "Ad-hoc training only."),
        (db_questions[4].id, "No", "Personal laptops being used without EDR."),
        (db_questions[5].id, "No", "No formal docs."),
    ]

    for q_id, ans, notes in responses1:
        r = QuestionnaireResponse(assessment_id=asm1.id, question_id=q_id, answer=ans, notes=notes)
        db.add(r)
    
    db.commit()

    # 5. Assessment 2: Improved State (Current)
    asm2 = Assessment(
        name="Post-Remediation Verification",
        organization_id=org.id,
        created_by=analyst.id,
        status=AssessmentStatus.COMPLETED,
        overall_score=72.0,
        severity="Low",
        created_at=datetime.utcnow()
    )
    db.add(asm2)
    db.commit()
    db.refresh(asm2)

    # Findings for Asm 2 (Most resolved)
    findings2 = [
        ("Web Security", "Insecure CSP Policy", "CSP is present but 'unsafe-inline' is allowed.", "Low", "acme.com", "CSP: script-src 'self' 'unsafe-inline'"),
    ]
    for cat, title, desc, sev, asset, tech in findings2:
        f = Finding(
            assessment_id=asm2.id, category=cat, title=title, description=desc, 
            severity=sev, affected_asset=asset, technical_details=tech, status="open"
        )
        db.add(f)

    # Responses for Asm 2 (Good responses)
    responses2 = [
        (db_questions[0].id, "Yes", "MFA enforced via Azure AD for all."),
        (db_questions[1].id, "Yes", "Immutable backups active."),
        (db_questions[2].id, "Yes", "Tested last week successfully."),
        (db_questions[3].id, "Yes", "Compulsory quarterly training."),
        (db_questions[4].id, "Yes", "SentinelOne deployed on all."),
        (db_questions[5].id, "In Progress", "Drafting IR plan with consultant."),
    ]
    for q_id, ans, notes in responses2:
        r = QuestionnaireResponse(assessment_id=asm2.id, question_id=q_id, answer=ans, notes=notes)
        db.add(r)

    db.commit()
    print("Seeding completed successfully.")
    db.close()

if __name__ == "__main__":
    seed_db()
