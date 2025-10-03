# Seller Codes Domain

## Overview

The Seller Codes domain manages unique identification codes assigned to sellers
within the organization. These codes are used for tracking, analytics, and
seller validation across the platform.

## Domain Model

- **SellerCode**: Aggregate root representing a unique seller identification
  code
  - `id`: Unique identifier (Long)
  - `code`: Unique seller code (String)
  - `organizationId`: Reference to the organization (String)
  - `status`: Current status (active, inactive, expired)
  - `createdAt`, `updatedAt`, `deletedAt`: Audit timestamps
  - `version`: Optimistic locking version

## Business Rules

1. Each seller code must be unique across the system
2. Seller codes can have statuses: active, inactive, or expired
3. Seller codes support soft deletion (no hard deletes)
4. Organization ID is required for all seller codes

## Use Cases

- **GetAllSellerCodes**: Retrieve list of all active seller codes
- **GetSellerCodeById**: Retrieve single seller code by ID
- **CreateSellerCode**: Create new seller code with validation
- **UpdateSellerCode**: Update existing seller code with version check
- **DeleteSellerCode**: Soft delete seller code

## API Endpoints

- `GET /api/v1/seller-codes` - List all seller codes
- `GET /api/v1/seller-codes/{id}` - Get seller code by ID
- `POST /api/v1/seller-codes` - Create new seller code
- `PUT /api/v1/seller-codes/{id}` - Update seller code
- `DELETE /api/v1/seller-codes/{id}` - Delete seller code

## Access Control

- List/View: Requires 'admin' or 'manager' role
- Create/Update/Delete: Requires 'admin' role only

## Related Domains

- Organizations (via organizationId reference)
- Analytics (seller code usage tracking)
