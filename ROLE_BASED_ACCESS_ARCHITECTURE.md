# Role-Based Access Architecture

## Project Context
This document defines the recommended role-based access architecture for the **SME Cyber Risk Dashboard**. It keeps the permission model realistic, implementable, and suitable for a master's-level cybersecurity web application.

## Primary Roles

### 1. Super Admin
Platform-level governance role.

Core responsibilities:
- Manage all users
- Manage all organizations
- View all assessments
- Manage questionnaire templates
- Manage recommendation rules
- View audit logs
- Monitor platform usage
- Deactivate users or organizations

This role is responsible for platform governance rather than day-to-day business operations.

### 2. Organization Owner / Business Owner
Business-level decision-making role.

Core responsibilities:
- Create and manage organization profiles
- Invite team members
- Assign internal roles
- Start assessments
- View executive dashboard
- View findings summaries
- View recommendations
- Download reports
- Track remediation progress
- Accept risk where appropriate

This role should see business-facing insight rather than deep technical output.

### 3. Security Analyst / IT Admin
Technical operational role.

Core responsibilities:
- Run scans on authorized domains
- Fill or assist with technical questionnaire sections
- View detailed scan outputs
- Review findings and evidence
- Update remediation status
- Add notes and comments
- Validate fixed issues
- Manage technical follow-up actions

This role requires detailed evidence, technical outputs, and workflow actions.

### 4. Viewer / Auditor
Read-only oversight role.

Core responsibilities:
- View dashboards
- View assessment history
- View reports
- View findings in read-only mode
- Cannot edit organizations, findings, recommendations, or users

This role is suitable for management observers, compliance reviewers, and external auditors.

## Four Access Control Layers
Role-based control in this platform should be presented and implemented across four layers:

### Layer 1: Authentication
Defines who the user is.

Required controls:
- Secure login
- JWT or secure session authentication
- Password hashing
- Session validation
- Account activation and deactivation

### Layer 2: Authorization
Defines what the user is allowed to do.

Required controls:
- Backend permission checks
- Role-based route protection
- Role-based API protection
- Action-level authorization for assessments, findings, recommendations, and reports

Important design rule:
- Do not rely only on frontend button hiding
- Real authorization must be enforced at backend API level

### Layer 3: Data Scope
Defines which data the user is allowed to access.

Required controls:
- Organization ownership checks
- Organization membership checks
- Organization-scoped assessments
- Organization-scoped findings
- Organization-scoped reports
- Tenant isolation across organizations

This is critical for any multi-organization platform.

### Layer 4: UI Personalization
Defines what interface and level of detail the user sees.

Required controls:
- Role-specific dashboards
- Role-specific navigation
- Role-specific report visibility
- Summary versus technical detail separation

This makes the platform feel like a real product rather than a generic dashboard.

## Role-Based Dashboard Design

### Super Admin Dashboard
- Total users
- Total organizations
- Total assessments
- Platform activity
- Audit log visibility
- System health metrics

### Organization Owner Dashboard
- Overall risk score
- Top business risks
- Priority actions
- Posture trend
- Report download shortcuts

### Security Analyst Dashboard
- Open findings
- Critical findings
- Technical scan results
- Remediation workflow
- Evidence details

### Viewer Dashboard
- Read-only summaries
- Reports
- Trends
- Findings overview

## Role-Based Feature Access

### Super Admin
Can:
- Manage platform settings
- Manage users
- Manage organizations
- Manage questionnaire templates
- Manage recommendation rules
- Access audit logs

### Organization Owner
Can:
- Manage own organization
- Invite users
- Launch assessments
- View dashboards
- View reports
- Approve and track remediation

### Security Analyst
Can:
- Run scans
- Update findings and remediation
- Add notes
- Review evidence
- Manage assessment-level work

### Viewer
Can:
- View approved and read-only information only

## Role-Based Data Visibility
Access control should define not only actions, but also data depth.

Example:
- A Business Owner may see: "DMARC is missing, increasing email impersonation risk"
- A Security Analyst may see: raw DMARC lookup result, DNS response, technical misconfiguration details, and recommended record format

This is a strong real-world design choice because the same finding is presented differently depending on the role.

## Role-Based Organization Scope
Users must never access data belonging to organizations they do not belong to.

Required organization scope rules:
- Enforce organization ownership
- Enforce organization membership
- Restrict organization-specific assessments
- Restrict organization-specific reports
- Restrict organization-specific findings

## Role-Based Assessment Permissions
Assessment actions should be role-aware.

Example model:
- Owner can create assessments
- Analyst can run and update technical sections
- Viewer can only view completed assessments
- Super Admin can view all assessments across organizations

Assessment permission areas:
- Create
- Edit
- Run
- View
- Compare
- Export

## Role-Based Findings and Remediation Actions

### Business Owner
- View findings summary
- View business impact
- Approve risk acceptance
- Track remediation status

### Security Analyst
- Review evidence
- Add notes
- Change finding status
- Update remediation details
- Validate fixes

### Viewer
- Read findings and progress in read-only mode

This workflow makes the system feel operational and realistic.

## Role-Based Report Access
Reports should be restricted by role and report type.

Recommended model:
- Owner can download executive and full reports
- Analyst can download technical reports
- Viewer can read approved reports only
- Super Admin can access all reports

Controls to enforce:
- Who can generate reports
- Who can download reports
- Who can access executive-only reports
- Who can access technical appendices

## Role-Based Audit Logging
Sensitive actions should always be logged with role and user identity.

Track events such as:
- Logins
- Failed logins
- User invitations
- Role changes
- Assessment creation
- Scan triggering
- Finding updates
- Remediation changes
- Report downloads
- Risk acceptance approvals

Access control without accountability is incomplete.

## Role Assignment and Invitation Flow
If users can invite other users, role assignment becomes part of the product's security model.

Required controls:
- Invite user by email
- Assign role at invitation time
- Accept invitation flow
- Allow Organization Owners to change organization-level roles
- Allow Super Admins to suspend users
- Prevent privilege escalation

Important example:
- A Security Analyst must not be able to promote themselves to Owner or Super Admin

## Recommended Permission Modules
Permissions should be defined clearly around these modules.

### User Management
- Create user
- Invite user
- Update role
- Deactivate user
- View users

### Organization Management
- Create organization
- Edit organization
- Deactivate organization
- View organization members

### Assessments
- Create assessment
- Run assessment
- Update assessment
- View assessment
- Compare assessments

### Findings
- View findings
- Filter and search findings
- Add notes
- Update status
- Assign findings
- Accept risk

### Recommendations
- View recommendations
- Update remediation status
- Assign remediation owner
- Mark resolved

### Reports
- Generate report
- View report
- Download report

### Admin Controls
- Manage templates
- Manage questionnaire bank
- View audit logs
- Monitor all tenants

## Best Practical Permission Model
To keep the implementation realistic and strong, use this model:

- Super Admin: full platform access
- Organization Owner: full access within their organization except platform settings
- Security Analyst: technical assessment and remediation access within assigned organization
- Viewer: read-only access within assigned organization

This is enough for a master's-level project and avoids unnecessary complexity.

## Biggest Mistakes to Avoid
- Only hiding buttons in the UI without backend authorization
- Creating too many roles
- Failing to isolate organization data
- Omitting audit logs for sensitive actions
- Showing the same dashboard to every user

## Highest-Priority Role-Based Capabilities
If implementation time is limited, focus on these first:
- Secure backend authorization
- Organization-based data isolation
- Role-specific dashboards
- Role-specific actions on assessments, findings, and reports
- Invitation and team management
- Audit logging for sensitive actions
