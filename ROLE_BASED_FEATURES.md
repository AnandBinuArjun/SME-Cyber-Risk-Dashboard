# Real-Life Features List with Role-Based Control

## Project Title
**SME Cyber Risk Dashboard: A Web-Based Security Posture Assessment and Remediation Platform for Small Businesses**

## Overview
This feature specification defines a realistic, role-based cybersecurity web application for small and medium-sized businesses. The goal is to combine secure access control, external security posture assessment, internal cyber readiness evaluation, explainable risk scoring, remediation tracking, reporting, and governance support in a practical master's-level project.

## 1. Authentication and Access Control
- Secure user registration and login
- JWT-based authentication
- Password hashing and secure session handling
- Forgot password and password reset flows
- Role-based access control
- Role-based route protection
- Role-based API protection
- Account activation and deactivation
- Audit trail for login and other sensitive actions

## 2. User Roles

### Super Admin
- Manage all users across the platform
- Manage all organizations
- View all assessments
- Configure questionnaire templates
- Configure recommendation rules
- View audit logs
- Monitor overall platform activity

### Organization Owner / Business Owner
- Create and manage organization profiles
- Invite internal team members
- Start and view assessments for their organization
- View executive dashboard
- View findings and recommendations
- Download reports
- Track remediation progress

### Security Analyst / IT Admin
- Run assessments on authorized domains
- View detailed technical findings
- Review scan outputs
- Update remediation status
- Add notes to findings
- View evidence and technical recommendations

### Viewer / Auditor
- Read-only access to selected dashboards
- View reports and assessment results
- Cannot modify findings, recommendations, or organization settings

## 3. Organization Management
- Create organization profiles
- Edit company details
- Add domain and business information
- Support multiple team members per organization
- Assign users to roles within the organization
- Activate or deactivate organizations
- Manage ownership and access permissions

## 4. Team and Role Management
- Invite users by email
- Assign roles during invitation
- Change user roles inside the organization
- Remove team members
- Restrict access based on role
- View member activity history
- Separate organization-level roles from platform-level admin roles

## 5. Assessment Management
- Create new security assessments
- Assign assessments to an organization
- Track assessment status
- Save assessment history
- Compare previous and current assessments
- View who created and updated an assessment
- Restrict assessment actions by role

## 6. External Security Posture Checks
- SSL/TLS certificate inspection
- Certificate expiry detection
- HTTP and HTTPS reachability checks
- Security header analysis
- DNS record inspection
- SPF validation
- DKIM validation
- DMARC validation
- MX record inspection
- Email spoofing exposure indication

## 7. Internal Security Questionnaire
- Role-based questionnaire access
- Security readiness assessment by category
- Access Control questions
- Backup and Recovery questions
- Endpoint Security questions
- Employee Awareness questions
- Incident Response questions
- Remote Access Security questions
- Save draft responses
- Submit final responses for scoring

## 8. Findings Management
- Detect and store security findings
- Categorize findings by area
- Assign severity levels
- Show affected assets
- Store technical evidence
- Filter findings by severity, category, and status
- Add analyst notes
- Mark findings as Open, In Progress, Resolved, or Accepted Risk

## 9. Risk Scoring and Analysis
- Category-wise cyber risk score
- Overall cyber risk score
- Severity classification
- Explainable weighted scoring model
- Risk heatmap
- Business impact mapping
- Likelihood versus impact view
- Historical trend comparison
- Security maturity score

## 10. Recommendation and Remediation Management
- Auto-generate remediation recommendations
- Assign recommendation priority
- Assign effort estimates
- Show business impact explanations
- Show technical fix guidance
- Track remediation status
- Divide actions into Immediate Actions, Quick Wins, Medium-Term Improvements, and Long-Term Improvements
- Link recommendations to findings

## 11. Dashboard and Analytics

### Business Owner Dashboard
- Overall risk score
- Top business risks
- Priority recommendations
- Historical posture trends
- Executive summary cards

### Security Analyst Dashboard
- Detailed findings
- Category-wise technical breakdown
- Scan results
- Evidence and technical remediation details
- Risk scoring detail view

### Admin Dashboard
- Platform activity overview
- Organization count
- User count
- Assessment statistics
- Audit and system usage overview

## 12. Reporting
- Generate downloadable PDF reports
- Executive summary reports
- Technical findings reports
- Recommendation summaries
- Historical assessment reports
- Role-based report access
- Report generation history

## 13. Audit and Monitoring
- Audit logs for user actions
- Track login activity
- Track report downloads
- Track assessment creation and updates
- Track role changes
- Track remediation updates
- Admin-only audit log access

## 14. Compliance and Governance
- Basic mapping to NIST CSF
- Basic mapping to CIS Controls
- Governance readiness indicators
- Compliance gap overview
- Policy maturity indicators

## 15. Alerts and Notifications
- Certificate expiry alerts
- High-risk finding alerts
- Assessment completion notifications
- New report generated notifications
- Remediation overdue alerts
- Role-based notification visibility

## 16. UI and Usability Features
- Role-based dashboards
- Sidebar navigation by role
- Responsive user interface
- Severity badges
- Interactive charts
- Trend comparison visuals
- Findings filters
- Recommendation cards
- Report preview and export
- Toast notifications and loading indicators

## Recommended Role Permissions Summary

### Super Admin
- Full access across the entire platform

### Organization Owner
- Manage organization settings
- Invite users
- View dashboard
- Create assessments
- View findings
- View recommendations
- Download reports
- Track remediation progress

### Security Analyst
- Run assessments
- View technical findings
- Manage remediation progress
- Add notes
- Analyze evidence
- View reports

### Viewer
- Read-only dashboard access
- Read-only report access
- Cannot edit platform or organization data

## Key Real-Life Features
- Secure authentication with role-based access control
- Multi-user organization and team management
- External domain security posture assessment
- Internal cyber readiness questionnaire
- Explainable cyber risk scoring engine
- Technical findings and remediation management
- Business-owner and analyst-specific dashboards
- Historical assessment tracking
- PDF report generation
- Audit logging and compliance mapping

## Practical Recommendation
To keep the project strong and realistic for a master's-level implementation, use no more than four main roles:
- Super Admin
- Organization Owner
- Security Analyst
- Viewer

This keeps the access model practical while still demonstrating both role-based UI control and role-based API enforcement.
