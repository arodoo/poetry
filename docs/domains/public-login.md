# Public Login Domain

## Overview

Handles the login process for unauthenticated users. Provides UI and
backend logic for secure authentication. The login page uses a
dance-academy-themed full-screen layout with an animated dancer mascot
whose pupils follow the user's cursor.

---

## Entities

- `LoginForm` — `{ username: string, password: string }`

---

## Business Rules

- Only valid users can log in.
- Login attempts are rate-limited (backend).
- Locale is resolved immediately from the URL path segment (e.g. `/es/login`
  → Spanish) before any async backend call completes.

---

## Use Cases

- **User login** — validates form, calls `POST /api/v1/auth/login`, navigates
  to `/:locale/dashboard` on success.

---

## Frontend File Structure

```
features/public-login/
  api/
    publicLoginApi.ts          POST /api/v1/auth/login
  components/
    dancer.css                 @keyframes dancer-float (4 s sway)
    DancerSvg.tsx              SVG mascot — eyes track cursor via useDancerEyes
    LoginLayout.tsx            Full-screen split layout (left brand / right form)
    LoginFormView.tsx
    LoginField.tsx
    PublicLoginField.tsx
    PublicLoginForm.tsx        Renders form card using Card / Stack UI primitives
    PublicLoginForm.types.ts
    ErrorBanner.tsx
  hooks/
    useDancerEyes.ts           Mouse→pupil-offset hook (MAX_OFFSET 3.5, DAMPING 25)
    useLoginPage.ts            Form state, validation, submit orchestration
    useLogin.ts                TanStack mutation wrapping the API call
    usePublicLoginQueries.ts
  locales/
    en.json
    es.json
  model/
    PublicLoginSchemas.ts      Zod schema for LoginForm
  pages/
    LoginPage.tsx              Orchestrates LoginLayout + DancerSvg + PublicLoginForm
  routing/
    public-loginRoutes.tsx     Route: :locale/login → LoginPageLazy
  utils/
    classifyError.ts
    loginValidation.ts
    loginSubmit.ts
```

---

## i18n Keys (`ui.publicLogin.*`)

| Key | EN | ES |
|-----|----|----|
| `ui.publicLogin.title` | Welcome back | Bienvenido de nuevo |
| `ui.publicLogin.description` | Sign in to your account. | Inicia sesión en tu cuenta. |
| `ui.publicLogin.username.label` | Username | Usuario |
| `ui.publicLogin.password.label` | Password | Contraseña |
| `ui.publicLogin.submit.label` | Sign in | Iniciar sesión |
| `ui.publicLogin.submit.pending` | Loading… | Cargando… |
| `ui.publicLogin.forgotLink` | Forgot your password? | ¿Olvidaste tu contraseña? |
| `ui.publicLogin.error.invalid` | Invalid username or password | Usuario o contraseña inválidos |
| `ui.publicLogin.error.network` | Network error. Please try again. | Error de red. Inténtalo de nuevo. |
| `ui.publicLogin.error.server` | Server error. Please try again. | Error del servidor. Inténtalo de nuevo. |
| `ui.publicLogin.error.generic` | Login failed. Please try again. | Error al iniciar sesión. Inténtalo de nuevo. |
| `ui.publicLogin.brand.name` | Poetry | Poetry |
| `ui.publicLogin.brand.tagline` | Where rhythm meets elegance | Donde el ritmo se encuentra con la elegancia |

---

## Dancer Mascot — Eye Tracking

`DancerSvg` renders an SVG ballet dancer whose pupils follow the cursor.

```
useDancerEyes(svgRef)
  → listens to window 'mousemove'
  → computes (dx, dy) from SVG element center (getBoundingClientRect)
  → dist = Math.hypot(dx, dy)
  → ratio = Math.min(dist / DAMPING, 1)   // DAMPING = 25
  → offset = (dx/dist, dy/dist) * MAX_OFFSET * ratio  // MAX_OFFSET = 3.5
  → cx={baseX + offset.x} cy={baseY + offset.y}
```

Left eye center `(72, 41)`, right eye center `(88, 41)` — both pupils share
the same offset vector.

---

## Dependencies

- Auth domain (tokens)
- I18n (locale, `useT`)
- `ui/Card`, `ui/Button`, `ui/Stack`, `ui/Heading`, `ui/Text`

---

## Status

- Implemented
- Redesigned: dance-academy theme, dancer mascot with cursor-tracking eyes,
  full-screen split layout (`LoginLayout`)
