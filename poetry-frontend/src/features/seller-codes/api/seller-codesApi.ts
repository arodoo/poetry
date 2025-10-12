/*
 * File: seller-codesApi.ts
 * Purpose: Public surface re-exporting seller codes queries and mutations.
 * All Rights Reserved. Arodi Emmanuel
 */
export {
  fetchSellerCodesList,
  fetchSellerCodesPage,
  fetchSellerCodeById,
} from './sellerCodesQueries'
export {
  createSellerCode,
  updateSellerCode,
  deleteSellerCode,
} from './sellerCodesMutations'
