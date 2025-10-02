/*
 * File: responseStatusProperty.ts
 * Purpose: Ensure the global Response object exposes a numeric status
 * property in environments where it is only available as a method.
 * All Rights Reserved. Arodi Emmanuel
 */
function ensureResponseStatusProperty(): void {
  if (typeof Response === 'undefined') {
    return
  }
  const descriptor: PropertyDescriptor | undefined =
    Object.getOwnPropertyDescriptor(Response.prototype, 'status')
  if (descriptor?.get || typeof descriptor?.value !== 'function') {
    return
  }
  const originalStatus: () => number = descriptor.value as () => number
  Object.defineProperty(Response.prototype, 'status', {
    configurable: true,
    enumerable: true,
    get(): number {
      return originalStatus.call(this)
    },
  })
}

ensureResponseStatusProperty()
