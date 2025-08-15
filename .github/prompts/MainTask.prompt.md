---
mode: agent
---
```yaml
roles:
  - name: Public
    description: No authentication required
    permissions:
      - Access public pages
      - Access registration/authentication forms
  - name: Authenticated
    description: Authenticated user
    permissions:
      - Access dashboard
      - Access profile
      - Access account settings
      - Access support
      - Access notifications
  - name: Manager
    description: Operational management at organization level
    permissions:
      - Manage themes
      - Manage zones
      - Manage seller codes
      - Manage memberships
      - Manage subscriptions
      - Manage imports/exports
      - Access organization-scoped views
    restrictions:
      - No access to global configuration
      - No access to users, billing, global integrations, API keys/webhooks, or platform-level panels
  - name: Admin
    description: Global administrator
    permissions:
      - Full access to all global and platform functionalities
      - Manage users
      - Manage global configuration
      - Manage billing
      - Manage integrations
      - Manage API/webhooks
      - Access monitoring tools

modules:
  - name: Auth
    requirements:
      - id: RF-A1
        description: Allow authentication via username/password
      - id: RF-A2
        description: Issue and refresh JWT (JSON Web Tokens) with support for refresh tokens
      - id: RF-A3
        description: Manage sessions and remember tokens for session persistence
      - id: RF-A4
        description: Provide endpoints for password recovery, change, and validation
      - id: RF-A5
        description: Implement email verification
      - id: RF-A6
        description: Restrict route access based on role
  - name: User
    requirements:
      - id: RF-U1
        description: CRUD users (Admin only)
      - id: RF-U2
        description: Assign and manage roles and statuses (active/inactive/blocked)
      - id: RF-U3
        description: Expose permission information (RBAC) to the front-end
      - id: RF-U4
        description: Record lifecycle events (creation, activation, deactivation)
      - id: RF-U5
        description: Allow user data export and deletion
  - name: Theme
    requirements:
      - id: RF-T1
        description: Create, edit, and view themes
      - id: RF-T2
        description: Associate theme resources (images, fonts, color palettes)
      - id: RF-T3
        description: Restrict visibility and editing by role (Manager/Admin according to scope)
  - name: Language
    requirements:
      - id: RF-L1
        description: List and configure supported languages
      - id: RF-L2
        description: Store configurations in the backend domain and infrastructure
      - id: RF-L3
        description: Allow users to select their preferred language
  - name: Session
    requirements:
      - id: RF-S1
        description: Record active sessions and allow session invalidation
      - id: RF-S2
        description: Manage refresh tokens for JWT renewal
  - name: Config
    requirements:
      - id: RF-C1
        description: Manage system-wide global configuration (Admin only)
      - id: RF-C2
        description: Share AppConfig entity between backend and frontend
      - id: RF-C3
        description: Allow updates from the web administration interface
  - name: Zones
    requirements:
      - id: RF-Z1
        description: Create, edit, and list zones
      - id: RF-Z2
        description: Associate zones to an organization (Manager/Admin)
  - name: Seller Codes
    requirements:
      - id: RF-SC1
        description: Create, edit, view, and delete seller codes
      - id: RF-SC2
        description: Restrict to organization scope (Manager/Admin)
  - name: Memberships & Subscriptions
    requirements:
      - id: RF-MS1
        description: Create, edit, and delete memberships and subscriptions
      - id: RF-MS2
        description: Manage plans and renewals
      - id: RF-MS3
        description: Restrict to organization scope (Manager/Admin)
  - name: Dashboard & Home
    requirements:
      - id: RF-DH1
        description: Display a public home page with basic information
      - id: RF-DH2
        description: Provide a personalized dashboard for authenticated users
      - id: RF-DH3
        description: Include metrics and quick access links according to role
  - name: Data Ops
    requirements:
      - id: RF-DO1
        description: Allow data import and export
      - id: RF-DO2
        description: Restrict to Manager/Admin within organization scope
  - name: Admin Only Features
    requirements:
      - id: RF-AO1
        description: Global system configuration (/configuration)
      - id: RF-AO2
        description: Global management of organizations and their members
      - id: RF-AO3
        description: Billing management, invoices, and usage
      - id: RF-AO4
        description: Global integrations and provider configuration
      - id: RF-AO5
        description: API key and webhook management
      - id: RF-AO6
        description: System health monitoring and scheduled jobs
        
# Mandatory Functionality

Language with i18n
- MultiLanguage Breadcrumbs.
- MultiLanguage UI.

Tables and bulk export
- All list views export to XLSX, CSV, DOCX.
- Export respects filters/sort/selection; options: selected vs all; file name `<module>_<YYYYMMDD-HHmm>.<ext>`.

