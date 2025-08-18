---
mode: agent
---

## Roles

**Public:** Accessible without authentication.

**Authenticated:** Requires a logged-in user.

**Manager:** Operational manager at the organization level. Can manage content
and functional data (themes, zones, seller codes, memberships, subscriptions,
imports/exports, and organization-specific views). Cannot access global
configuration, users, billing, global integrations, API keys/webhooks, or
platform-wide dashboards.

**Admin:** Full access to global and platform-level features (users,
configuration, billing, integrations, API keys/webhooks, health/jobs).

---

## Routes by Role

### Public

- `/` (Home)
- `/login` (Login)
- `/register` (Register)
- `/forgot-password`
- `/reset-password/:token`
- `/verify-email/:token`
- `/status`
- `/404` (Not Found)

### Authenticated

- `/dashboard`
- `/profile`
- `/account/settings`
- `/account/security`
- `/account/audit-log`
- `/account/export-data`
- `/account/delete`
- `/onboarding`
- `/help`
- `/search`
- `/notifications`
- `/account/notifications`

### Admin & Manager (Shared)

- `/admin` (Operational home)
- **Themes:** `/themes`, `/themes/new`, `/themes/edit/:id`
- **Zones:** `/zones`, `/zones/new`, `/zones/edit/:id`
- **Seller Codes:** `/seller-codes`, `/seller-codes/new`, `/seller-codes/:id`,
  `/seller-codes/edit/:id`
- **Memberships:** `/memberships`, `/memberships/new`, `/memberships/edit/:id`
- **Subscriptions:** `/subscriptions`, `/subscriptions/new`,
  `/subscriptions/manage`
- **Organizations (scoped):** `/orgs`, `/orgs/:orgId`, `/orgs/:orgId/members`,
  `/orgs/:orgId/audit-log`
- **Data Ops:** `/imports`, `/exports`

### Admin Only

- `/configuration` (Global)
- **Users:** `/users`, `/users/new`, `/users/:id`
- **Organizations (global):** `/orgs/new`
- **Billing:** `/billing`, `/billing/invoices`, `/billing/usage`
- **Integrations:** `/integrations`, `/integrations/:provider`
- **API / Webhooks:** `/admin/api-keys`, `/admin/webhooks`
- **Platform:** `/admin/health`, `/admin/jobs`

---

## Navigation Map (Tree)

```
[Public]
/
    /login
    /register
    /forgot-password
    /reset-password/:token
    /verify-email/:token
    /status
    * → /404

[Authenticated]
/dashboard
    /profile
    /account
        /account/settings
        /account/security
        /account/audit-log
        /account/export-data
        /account/delete
        /account/notifications
    /onboarding
    /help
    /search
    /notifications

[Admin & Manager]
/admin
    Themes → /themes, /themes/new, /themes/edit/:id
    Zones → /zones, /zones/new, /zones/edit/:id
    Seller Codes → /seller-codes, /seller-codes/new, /seller-codes/:id, /seller-codes/edit/:id
    Memberships → /memberships, /memberships/new, /memberships/edit/:id
    Subscriptions → /subscriptions, /subscriptions/new, /subscriptions/manage
    Organizations (scoped) → /orgs, /orgs/:orgId, /orgs/:orgId/members, /orgs/:orgId/audit-log
    Data Ops → /imports, /exports

[Admin only]
/configuration
    Users → /users, /users/new, /users/:id
    Organizations (global) → /orgs/new
    Billing → /billing, /billing/invoices, /billing/usage
    Integrations → /integrations, /integrations/:provider
    API / Webhooks → /admin/api-keys, /admin/webhooks
    Platform → /admin/health, /admin/jobs
```
