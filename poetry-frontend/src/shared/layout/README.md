/\*

- File: README.md
- Purpose: Documents the layout folder organization structure.
- All Rights Reserved. Arodi Emmanuel \*/

# Layout Module Structure

This folder contains the main application layout components organized following
Domain-Driven Design principles.

## Folder Structure

````
layout/
├── components/              # Main layout components
│   ├── AppShell.tsx        # Main app container
│   ├── Navbar.tsx          # Top navigation bar
│   └── BlockingOverlaySmall.tsx  # Loading overlay
├── sidebar/                # Sidebar navigation module
│   ├── components/
│   │   ├── Sidebar.tsx     # Main sidebar component
│   │   └── SidebarItem.tsx # Individual nav item
│   ├── config/
│   │   └── navigationConfig.ts  # Navigation items config
│   ├── types.ts           # Sidebar types
│   └── index.ts           # Public exports
├── user-menu/             # User menu dropdown module
│   ├── components/
│   │   ├── UserMenu.tsx       # Main entry
│   │   ├── UserMenuCore.tsx   # Core wrapper
│   │   ├── UserMenuCoreImpl.tsx  # Implementation
│   │   └── UserMenuItems.tsx  # Menu items
│   ├── hooks/
│   │   └── useUserMenuDependencies.ts
│   ├── logic/
│   │   ├── UserMenuCoreLogic.tsx  # Business logic
│   │   └── userMenuLogout.ts  # Logout handler
│   ├── config/
│   │   └── userMenuLabels.ts  # Label configuration
│   └── index.ts           # Public exports
└── index.ts               # Main layout exports

## Usage

```typescript
// Import layout components
import { AppShell, Navbar, Sidebar, UserMenu } from '@/shared/layout'
import type { SidebarProps } from '@/shared/layout'

// Or import from specific modules
import { Sidebar } from '@/shared/layout/sidebar'
import { UserMenu } from '@/shared/layout/user-menu'
````

## Guidelines

- Keep components under 60 lines (CI enforces 80)
- Each module should have a clear, single responsibility
- Use barrel exports (index.ts) for clean public APIs
- Keep config separate from logic and components
- Follow kebab-case for folder names
- Use PascalCase for component files
