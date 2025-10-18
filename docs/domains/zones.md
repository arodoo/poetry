# Zones Domain

## Overview
Zones define geographic or logical regions for organization-level segmentation. They are used for routing, reporting and scoping resources.

## Entities
- Zone
- ZoneManager

## Business Rules
- Zones can be active/inactive
- Each zone can have at most one manager

## Use Cases
- Create/edit/delete zones
- Assign managers to zones
- List and paginate zones

## Dependencies
- Users (for manager reference)

## Status
Implemented
