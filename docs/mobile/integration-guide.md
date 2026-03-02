/*
 * File: integration-guide.md
 * Purpose: Hands-on guide for teams integrating the new auth
 * system with existing UI and implementing new features.
 * Includes copy-paste examples and common pitfalls.
 * All Rights Reserved. Arodi Emmanuel
 */

# Integration Guide: Using the New Auth System

## 1. Your First Screen: Feature Profile

### Task
Build a profile screen showing user info, tier, backup status.

### 1.1 Screen Component

**File**: `features/auth/screens/ProfileScreen.tsx` (~50L)

```typescript
/*
 * File: ProfileScreen.tsx
 * Purpose: Displays user profile, subscription tier,
 * and backup consent status. Allows updating display name.
 * All Rights Reserved. Arodi Emmanuel
 */
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/shared/auth/AuthContext'
import { isPro } from '@/shared/auth/SubscriptionTier'

export default function ProfileScreen() {
  const { t } = useTranslation()
  const { user, tier, backupConsent, logout } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.displayName ?? '')

  if (!user) {
    return (
      <View>
        <Text>{t('auth.profile.loggedOut')}</Text>
      </View>
    )
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {t('auth.profile.title')}
      </Text>
      <Text>{user.email}</Text>
      <Text>{t('auth.subscription.' + tier)}</Text>
      {backupConsent.granted && (
        <Text>{t('auth.backup.consentGranted')}</Text>
      )}
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
```

### 1.2 Hook It Into Routes

**File**: `app/(app)/(tabs)/_layout.tsx`

```typescript
import ProfileScreen from '@/features/auth/screens/ProfileScreen'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
```

Then create: `app/(app)/(tabs)/profile.tsx`

```typescript
import ProfileScreen from '@/features/auth/screens/ProfileScreen'
export default ProfileScreen
```

### 1.3 Test It

```bash
npm test -- profile.test.ts
```

Test file: `src/tests/auth/profile.test.ts` (~45L)

```typescript
import { renderHook } from '@testing-library/react-native'
import { useAuth } from '@/shared/auth/AuthContext'

describe('ProfileScreen integration', () => {
  it('displays user info from useAuth', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.user).toBeDefined()
    expect(result.current.tier).toBeDefined()
  })
})
```

---

## 2. Common Pitfall: useAuth in Non-Provider Context

### ❌ WRONG

```typescript
export function App() {
  const auth = useAuth()  // ← ERROR: useAuth() called OUTSIDE AuthProvider

  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  )
}
```

### ✅ RIGHT

```typescript
function Root() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  )
}

export function App() {
  return <Root />
}

// Inside any screen component nested under AuthProvider:
export function MyScreen() {
  const auth = useAuth()  // ✅ OK: inside AuthProvider tree
}
```

---

## 3. Feature Gating: Pro-Only Features

### 3.1 Block UI for Non-Pro

```typescript
import { isPro } from '@/shared/auth/SubscriptionTier'

export function BackupButton() {
  const { tier } = useAuth()

  if (!isPro(tier)) {
    return (
      <TouchableOpacity disabled style={{ opacity: 0.5 }}>
        <Text>{t('auth.backup.requiresPro')}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={handleBackup}>
      <Text>{t('auth.backup.consentGrant')}</Text>
    </TouchableOpacity>
  )
}
```

### 3.2 Block Logic for Non-Pro

```typescript
export function RequestBackup() {
  const { tier, backupConsent } = useAuth()

  const canBackup = isPro(tier) && backupConsent.granted

  if (!canBackup) {
    showAlert('Upgrade to Pro to enable backup')
    return
  }

  // Proceed with backup logic
}
```

---

## 4. Updating User Profile

### 4.1 After User Edits Name

```typescript
export function EditProfileForm() {
  const { updateProfile, user } = useAuth()
  const [name, setName] = useState(user?.displayName ?? '')

  async function handleSave() {
    try {
      await updateProfile({ displayName: name })
      showToast('Profile updated')
    } catch (err) {
      showToast('Failed to update profile')
    }
  }

  return (
    <>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Display name"
      />
      <Button onPress={handleSave} title="Save" />
    </>
  )
}
```

---

## 5. Backup Consent UI

### 5.1 Grant Consent

```typescript
export function BackupConsentForm() {
  const { grantBackupConsent, backupConsent } = useAuth()

  async function handleGrant() {
    try {
      await grantBackupConsent()
      showToast(t('auth.backup.consentGranted'))
    } catch (err) {
      showError('Failed to save consent')
    }
  }

  if (backupConsent.granted) {
    return <Text>{t('auth.backup.consentGranted')}</Text>
  }

  return (
    <TouchableOpacity onPress={handleGrant}>
      <Text>{t('auth.backup.consentGrant')}</Text>
    </TouchableOpacity>
  )
}
```

---

## 6. Network Errors: Handling Gracefully

### 6.1 Backup Button with Network Awareness

```typescript
export function BackupButtonWithNetworking() {
  const [isOnline, setIsOnline] = useState(true)
  const { tier, backupConsent } = useAuth()

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
      setIsOnline(isConnected ?? false)
    })
    return unsubscribe
  }, [])

  async function handleBackup() {
    if (!isOnline) {
      showToast('No internet. Backup will retry when online.')
      // TODO: Queue backup for retry
      return
    }

    if (!isPro(tier)) {
      showToast(t('auth.backup.requiresPro'))
      return
    }

    if (!backupConsent.granted) {
      showToast(t('auth.backup.consentRequired'))
      return
    }

    // Proceed with backup
  }
}
```

---

## 7. Testing Auth Flows

### 7.1 Mock useAuth in Tests

**Setup**: `src/tests/setup/authMocks.ts`

```typescript
export const createMockAuth = (overrides = {}) => ({
  status: 'authenticated' as const,
  user: {
    id: 'test-user',
    email: 'test@example.com',
    displayName: 'Test User',
  },
  tier: 'free' as const,
  backupConsent: { granted: false, grantedAt: null, revokedAt: null },
  login: jest.fn(),
  logout: jest.fn(),
  updateProfile: jest.fn(),
  setTier: jest.fn(),
  grantBackupConsent: jest.fn(),
  revokeBackupConsent: jest.fn(),
  ...overrides,
})
```

**Usage in Test**:

```typescript
jest.mock('@/shared/auth/AuthContext', () => ({
  useAuth: jest.fn(() => createMockAuth()),
}))

describe('MyScreen', () => {
  it('displays user email', () => {
    render(<MyScreen />)
    expect(screen.getByText('test@example.com')).toBeTruthy()
  })

  it('upgrades to Pro', () => {
    const mockAuth = createMockAuth({ tier: 'pro' })
    useAuth.mockReturnValue(mockAuth)

    render(<UpgradeUI />)
    expect(screen.getByText('You are Pro')).toBeTruthy()
  })
})
```

---

## 8. i18n: Adding New Auth Strings

### 8.1 English

**File**: `features/auth/locales/en.ts`

```typescript
export default {
  // ... existing keys ...
  backup: {
    // ... existing ...
    retryButton: 'Retry backup',
    scheduledBackup: 'Schedule automatic backups',
  },
}
```

### 8.2 Spanish

**File**: `features/auth/locales/es.ts`

```typescript
export default {
  backup: {
    retryButton: 'Reintentar respaldo',
    scheduledBackup: 'Programar respaldos automáticos',
  },
}
```

### 8.3 Register in Catalog

**File**: `shared/i18n/catalog/en/index.ts`

```typescript
import auth from '../../../../features/auth/locales/en'
export default { auth }  // ← already imports auth!
```

(No change needed — `auth` already included.)

---

## 9. Debugging: Common Issues

### Issue 1: useAuth throws "must be used inside AuthProvider"

**Cause**: Component rendered outside AuthProvider tree

**Fix**: Check route nesting in `app/_layout.tsx`:
```typescript
<AuthProvider>  ← Must wrap entire navigation
  <Stack />
</AuthProvider>
```

### Issue 2: Profile not persisting after login

**Cause**: Profile not updated after tier/consent changes

**Debug**:
```typescript
const { tier, user } = useAuth()
console.log('User:', JSON.stringify(user, null, 2))
console.log('Tier:', tier)

// Check SecureStore directly:
import * as SecureStore from 'expo-secure-store'
const stored = await SecureStore.getItemAsync('poetry.user.profile')
console.log('Stored:', stored)
```

### Issue 3: Backup button appears for free users

**Cause**: Missing `isPro()` check

**Fix**:
```typescript
import { isPro } from '@/shared/auth/SubscriptionTier'

if (!isPro(tier)) {
  return <DisabledButton />
}
```

---

## 10. Checklist for New Feature Integration

- [ ] Import `useAuth` in screens
- [ ] Feature gates with `isPro(tier)` if needed
- [ ] All strings use `t('auth.xxx')` keys
- [ ] Error handling: try/catch on all async actions
- [ ] Network resilience: show toast on failure
- [ ] Tests: mock `useAuth` in component tests
- [ ] TypeScript: no `any`, no suppressions
- [ ] File size: ≤60L per module
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes

---

## 11. Migrating Existing Screens

### Old Pattern (No Profile)

```typescript
export function OldHome() {
  const { user, logout } = useAuth()
  return (
    <View>
      <Text>Welcome, {user?.email}</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  )
}
```

### New Pattern (Full Context)

```typescript
export function NewHome() {
  const { user, tier, backupConsent, logout } = useAuth()
  return (
    <View>
      <Text>Welcome, {user?.displayName}</Text>
      <Text>Plan: {tier === 'pro' ? 'Pro' : 'Free'}</Text>
      {backupConsent.granted && (
        <Text>Backup: Enabled</Text>
      )}
      <Button onPress={logout} title="Logout" />
    </View>
  )
}
```

---

## 12. Validation Patterns (Zod)

**When reading user input:**

```typescript
import { UserProfileSchema } from '@/shared/auth/UserProfile'

async function submitProfileForm(data: unknown) {
  try {
    const validated = UserProfileSchema.parse(data)
    await updateProfile(validated)
  } catch (err) {
    if (err instanceof ZodError) {
      err.errors.forEach(e => {
        showFieldError(e.path[0], e.message)
      })
    } else {
      showToast('Unexpected error')
    }
  }
}
```

---

## 13. Performance Tips

### Avoid Re-Renders

**Bad** (causes re-render on every auth change):
```typescript
function Heavy() {
  const auth = useAuth()  // ← useAuth for entire object
  return <ExpensiveChild user={auth.user} />
}
```

**Good** (destruct only needed fields):
```typescript
function Heavy() {
  const { user } = useAuth()  // ← Extract early
  return <ExpensiveChild user={user} />
}
```

### Memoize Callbacks

```typescript
const handleLogout = useCallback(async () => {
  await logout()
  navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
}, [logout, navigation])
```

---

## 14. Production Readiness Checklist

Before deploying to TestFlight/Play Store Beta:

- [ ] All 23 unit tests passing
- [ ] Login flow tested on real device (iOS + Android)
- [ ] Profile update persists across restarts
- [ ] Tier change reflected immediately in UI
- [ ] Backup consent timestamps recorded correctly
- [ ] Logout clears all data
- [ ] No hardcoded strings (all i18n)
- [ ] No console errors or warnings
- [ ] TypeScript strict: `npm run typecheck`
- [ ] Firebase Crashlytics events tracking
- [ ] Analytics: track login/logout/tier-change events

---

**Next**: Build Phase 1 features following `sync-layer-roadmap.md`
