# Charts Module

## Overview
The Charts Module is a specialized segment of the Dashboard designed to render analytical metrics visually. It provides broad macro perspectives (charts/KPIs) and deep drill-down capabilities (tables/sub-dashboards).

## Key Components
- **Macro Charts:** Standard presentation charts depicting metrics over time or aggregated distributions (e.g., `BirthdaysThisMonthChart`, `UsersByStatusChart`).
- **Sub-dashboards & Deep-dives:** Sub-pages routing to `/charts/details/:chartId`, which feature tabular data components (like `AccessLogsRawDataView`) and cross-cut interactive tabs (such as `ActiveHoursDetailsView`).
- **Strict Compliance Layers:** All charts components are deeply extracted and highly modular, preventing file scale bloat (enforcing 80 max lines per file logic). Heavy algorithms are confined to utility files (`mostActiveHoursUtils.ts`, `chartUtils.ts`) and custom hooks (`useChartDetailsTable.ts`).

## Dependencies
- **Recharts Library:** UI rendering.
- **Dashboard API (`fetchDashboardMetrics`):** The charts fetch their source of truth via queries directed to the Dashboard controller.

## Status
- Implemented (Type-safe and Clean UI)
