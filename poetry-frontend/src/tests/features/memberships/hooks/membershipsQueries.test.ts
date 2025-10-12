/*
 * File: membershipsQueries.test.ts
 * Purpose: Validate memberships query keys and query hook configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest';
import {
  membershipsQueryKeys,
  useMembershipsListQuery,
} from '../../../../features/memberships/hooks/useMembershipsQueries';

describe('Memberships Queries Hook', () => {
  it('membershipsQueryKeys should build stable keys', () => {
    const listKey = membershipsQueryKeys.list();
    const pageKey = membershipsQueryKeys.page(1, 10, 'q');
    const detailKey = membershipsQueryKeys.detail('abc');
    expect(Array.isArray(listKey)).toBe(true);
    expect(listKey[0]).toBe('memberships');
    expect(pageKey[2]).toBe(1);
    expect(detailKey[2]).toBe('abc');
  });

  it('useMembershipsListQuery should be a function', () => {
    expect(typeof useMembershipsListQuery).toBe('function');
  });
});
