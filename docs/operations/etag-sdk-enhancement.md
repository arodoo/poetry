# ETag Support in SDK - Enhancement Needed

## Overview

The backend requires `If-Match` headers with ETags for all PUT operations to
implement optimistic locking and prevent lost updates. Currently, the frontend
SDK doesn't support passing custom headers for mutation operations.

## Current Issue

**Status:** 428 Precondition Required  
**Endpoint:** `PUT /api/v1/users/:id`  
**Root Cause:** SDK's `update()` method doesn't accept headers parameter

## Backend Requirements

```java
@PutMapping("/{id}")
public ResponseEntity<UserDtos.UserResponse> update(
    @PathVariable Long id,
    @RequestHeader("If-Match") String ifMatch,
    @RequestBody UserDtos.UserUpdateRequest r) throws Exception {
  // ...
}
```

## Current SDK Limitation

```typescript
// usersClient.ts
export interface UsersSdk {
  update(id: string, body: unknown): Promise<UserDto> // ❌ No headers param
}
```

## Proposed Solution

### 1. Update HttpOptions Type

```typescript
// httpTypes.ts
export interface HttpOptions {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  retry?: RetryConfig
  signal?: AbortSignal
  etag?: string // ← Add optional ETag
}
```

### 2. Update SDK Interface

```typescript
// usersClient.ts
export interface UsersSdk {
  update(
    id: string,
    body: unknown,
    options?: { etag?: string }
  ): Promise<UserDto>
}
```

### 3. Update Implementation

```typescript
// usersClient.ts - createUsersSdk()
update(id: string, body: unknown, options?: { etag?: string }): Promise<UserDto> {
  const headers: Record<string, string> = {}
  if (options?.etag) {
    headers['If-Match'] = options.etag
  }
  return fetchJson<UserDto>(`${basePath}/${id}`, {
    method: 'PUT',
    body,
    headers,
  })
}
```

### 4. Update Mutation Helper

```typescript
// useUsersMutationHelpers.ts
export function useUsersEntityMutation<TInput>(
  fn: (id: string, input: TInput, etag?: string) => Promise<UserDetail>
): UseMutationResult<UserDetail, unknown, MutationVariables<TInput>> {
  const qc: QueryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, input, etag }: MutationVariables<TInput>) => {
      return fn(id, input, etag)
    },
    // ...
  })
}
```

### 5. Pass ETag from Detail Query

```typescript
// UserEditPage.tsx
const mutation = useUpdateUserMutation()
const detailQuery = useUserDetailQuery(id)

const handleSubmit = (data: UpdateUserInput) => {
  mutation.mutate({
    id,
    input: data,
    etag: detailQuery.data?.version, // ← Pass version as ETag
  })
}
```

## Related Files

- `poetry-frontend/src/shared/http/httpTypes.ts`
- `poetry-frontend/src/shared/http/clientCore.ts`
- `poetry-frontend/src/shared/sdk/usersClient.ts`
- `poetry-frontend/src/features/users/api/usersMutations.ts`
- `poetry-frontend/src/features/users/hooks/useUsersMutationHelpers.ts`
- `poetry-frontend/src/features/users/pages/UserEditPage.tsx`

## Test Impact

- `tests/e2e/users/users-edit.spec.ts` - Currently skipped, will pass after fix

## Next Steps

1. [ ] Update `HttpOptions` interface with optional `etag` field
2. [ ] Modify SDK methods to accept and use ETag option
3. [ ] Update mutation helpers to pass ETag through mutation chain
4. [ ] Modify edit pages to extract and pass `user.version` as ETag
5. [ ] Re-enable skipped edit test
6. [ ] Apply same pattern to other entities (profile, etc.)

## References

- Backend ETag implementation: `UsersUpdateController.java`
- Frontend ETag example: `tokensFetcher.ts` (read-only, uses If-None-Match)
- HTTP 428 status:
  [RFC 6585](https://datatracker.ietf.org/doc/html/rfc6585#section-3)
