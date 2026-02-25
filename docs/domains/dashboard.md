# Dashboard Domain

## Overview
Provides the main administrative and user dashboard views in the Poetry application. Aggregates key metrics, navigation, and quick actions for users after login. Designed for extensibility and integration with other features.

## Entities
- DashboardOverview
- DashboardWidget

## Business Rules
- Only authenticated users can access dashboards
- Widgets display data based on user roles

## Use Cases
- View dashboard overview
- Access quick links to features
- Drill down into Sub-Dashboards for granular tabulated metrics (e.g. Access Logs trends, Populated Regions)

## Dependencies
- Auth domain
- Users domain
- Access Logs domain (for retrieving and aggregating dynamic entrance charts)

## Status
- Implemented (Phase 4 Sub-Dashboards injected)
