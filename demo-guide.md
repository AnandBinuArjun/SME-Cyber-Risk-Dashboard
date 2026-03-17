# 🎯 SME Cyber Risk Dashboard: Presentation & Demo Guide

This guide provides a structured flow to demonstrate the **SME Cyber Risk Dashboard**. It is designed to showcase the technical depth, business value, and user experience of the platform.

---

## 🏗️ The Story: BrightPath Consulting Ltd
For this demo, we are using **BrightPath Consulting Ltd**, a fictional professional services firm with:
- **45 Employees**
- **One main website** (`brightpath.com`)
- **No dedicated security staff**
- **Goal**: To understand their risk before an upcoming insurance renewal.

---

## 🎬 Stage 1: Professional Access & RBAC
**Objective**: Show secure entry and role-based visibility.
- **Action**: Log in as `admin@platform.com` (Super Admin).
- **Highlight**: 
    - Premium **Glassmorphism UI** with a dark-cyber aesthetic.
    - Mention: *"The system enforces strict Role-Based Access Control (RBAC) using JWT, ensuring owners see business risk while analysts see technical evidence."*
- **Demo Line**: *“The system supports multiple roles, and each role only sees the data and actions relevant to them.”*

---

## 🏢 Stage 2: Organization Management
**Objective**: Show how SMEs are onboarded.
- **Action**: Go to **Organizations** and select **BrightPath Consulting**.
- **Highlight**:
    - Metadata tracking: industry, company size, and employee count.
    - Mention: *"Security posture is relative; the scoring engine adjusts weights based on the organization's profile and exposure surface."*
- **Talking Point**: *"The business owner sets up the organization profile and manages who can access the security data."*

---

## 🛡️ Stage 3: The Assessment Cycle
**Objective**: Show the "Hybrid" assessment approach (Technical Scan + Human Insight).
- **Action**: Navigate to **Assessments** and click **"Start New Assessment"**.
- **Action**: Navigate to **Questionnaire**.
- **Demo Line**: *“The platform combines technical external checks with internal readiness data, because risk cannot be measured from scanning alone.”*
- **Talking Point**: *"External scans show the 'outside-in' view, but the questionnaire captures critical internal controls like backup frequency and employee training."*

---

## 🔎 Stage 4: Explaining the Findings
**Objective**: Demonstrate how technical vulnerabilities are converted to business risk.
- **Action**: Go to **Technical Findings**.
- **Highlight these realistic examples**:
    - **High**: No DMARC Policy (Email Spoofing risk).
    - **Medium**: Missing Security Headers (HSTS/CSP).
    - **High**: Untested Backup Restoration.
- **Demo Line**: *“The system converts raw scan results into structured findings with severity, evidence, and affected asset details.”*

---

## 📊 Stage 5: Explainable Risk Scoring
**Objective**: Move from "problems" to "impact."
- **Action**: Open the **Dashboard**.
- **Highlight**:
    - The **72.0 / 100** Overall Score.
    - The category-wise breakdown (Web, Email, Access, Privacy).
- **Demo Line**: *“The score is explainable and category-weighted, so stakeholders can understand where risk is concentrated instead of seeing a black-box number.”*

---

## 🛠️ Stage 6: The Remediation Roadmap
**Objective**: Show the transition from detection to protection.
- **Action**: Go to **Remediation**.
- **Highlight**:
    - **Priority Labels**: Immediate vs. Quick Win.
    - **Effort vs. Benefit**: Small businesses need efficient fixes.
- **Demo Line**: *“The platform doesn’t stop at detection. It prioritizes remediation based on severity, business impact, and implementation effort.”*

---

## 📈 Stage 7: The "Killer Moment" (Progressive Value)
**Objective**: Show how security improves over time.
- **Action**: Show the **Assessment History**.
- **Comparison**:
    - **Baseline Assessment**: Score **38.5** (Risky).
    - **Final Assessment**: Score **72.0** (Improved).
- **Demo Line**: *“The real value of the platform is continuous improvement. The history view shows how remediation actions directly reduce measurable cyber risk over time.”*

---

## 📄 Stage 8: Reporting & Governance
**Objective**: Show auditability and outputs.
- **Action**: Show the **Report Archive** and **Audit Logs**.
- **Highlight**:
    - Downloadable PDF reports for stakeholders.
    - Immutable logs showing *who* changed *what* and *when*.
- **Demo Line**: *“Administrative oversight is supported through audit logging and professional report generation for executive management.”*

---

## 🔑 Demo Access Summary
| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@platform.com` | `password123` |
| **Org Owner** | `sarah@brightpath.com` | `password123` |
| **Analyst** | `alex@brightpath.com` | `password123` |
| **Viewer** | `tom@external.com` | `password123` |
