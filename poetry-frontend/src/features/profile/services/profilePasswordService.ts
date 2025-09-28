/*
 * File: profilePasswordService.ts
 * Purpose: Thin adapter over the account API for password change behavior.
 * Extracting this allows hooks to remain focused on state and wiring.
 * All Rights Reserved. Arodi Emmanuel
 */
import { updatePassword } from '../../account/api/accountApi'

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await updatePassword({ currentPassword, newPassword })
}

export default changePassword
