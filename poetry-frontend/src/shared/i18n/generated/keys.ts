/*
 * File: keys.ts
 * Purpose: Unified i18n key list (generated). Aggregator.
 * All Rights Reserved. Arodi Emmanuel
 */
import { KEYS_COMMON } from './keys-common';
import { KEYS_ROUTING } from './keys-routing';
import { KEYS_FEATURES_A } from './keys-features-a';
import { KEYS_FEATURES_B } from './keys-features-b';
import { KEYS_FEATURES_C } from './keys-features-c';
import { KEYS_FEATURES_D } from './keys-features-d';
import { KEYS_FEATURES_E } from './keys-features-e';
import { KEYS_FEATURES_F } from './keys-features-f';
import { KEYS_FEATURES_G } from './keys-features-g';
import { KEYS_FEATURES_H } from './keys-features-h';
import { KEYS_FEATURES_I } from './keys-features-i';
import { KEYS_FEATURES_J } from './keys-features-j';
import { KEYS_USERS_A } from './keys-users-a';
import { KEYS_USERS_B } from './keys-users-b';
import { KEYS_USERS_C } from './keys-users-c';
import { KEYS_USERS_D } from './keys-users-d';

export const I18N_KEYS: readonly string[] = [
  ...KEYS_COMMON,
  ...KEYS_ROUTING,
  ...KEYS_FEATURES_A,
  ...KEYS_FEATURES_B,
  ...KEYS_FEATURES_C,
  ...KEYS_FEATURES_D,
  ...KEYS_FEATURES_E,
  ...KEYS_FEATURES_F,
  ...KEYS_FEATURES_G,
  ...KEYS_FEATURES_H,
  ...KEYS_FEATURES_I,
  ...KEYS_FEATURES_J,
  ...KEYS_USERS_A,
  ...KEYS_USERS_B,
  ...KEYS_USERS_C,
  ...KEYS_USERS_D,
] as const;

export type I18nKey = (typeof I18N_KEYS)[number];
