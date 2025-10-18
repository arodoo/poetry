# Seller Codes Domain

## Overview
Seller codes are short, unique codes issued to sellers to grant promotional access or track referral activity. This domain centralizes creation, validation and auditing for seller codes.

## Entities
- SellerCode
- RedemptionRecord

## Business Rules
- Codes must be unique per seller
- Codes have expiration and usage limits

## Use Cases
- Create new seller code
- Redeem a seller code
- List seller codes for a seller

## Dependencies
- Users (to map seller Ids)
- Subscriptions (to apply discounts)

## Status
Implemented (API and UI components exist)
