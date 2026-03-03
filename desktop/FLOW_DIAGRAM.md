# Poetry Desktop - Internal Flow Diagram

## Build Flow (Docker)

```
┌─────────────────────────────────────────────────────────────┐
│                   docker build (one command)                 │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    ┌────────┐          ┌────────┐          ┌────────┐
    │Backend │          │Frontend│          │Launcher│
    │(Maven) │          │(Vite)  │          │(Javac) │
    └────────┘          └────────┘          └────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
        ┌──────┐        ┌──────┐       ┌───────┐
        │JRE21 │        │PG16  │       │Drivers│
        │(DL)  │        │(DL)  │       │RTE    │
        └──────┘        └──────┘       └───────┘
            │               │               │
            └───────────────┼───────────────┘
                            │
                    ┌───────▼────────┐
                    │   App Bundle   │
                    │ /bundle/Poetry/│
                    └────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
        ┌──────────────┐        ┌──────────────┐
        │ Inno Setup   │        │   Output     │
        │ (Wine via    │───────▶│   EXE        │
        │ Docker)      │        │              │
        └──────────────┘        └──────────────┘
```

## Installation Flow (User Machine)

```
User double-clicks PoetrySetup-1.0.0.exe
│
▼
┌──────────────────────────────────────┐
│  Inno Setup Wizard (Admin Check)     │
│  - Accept license                    │
│  - Choose install dir (default OK)   │
│  - Select desktop shortcut (optional)│
└──────────────────────────────────────┘
│
▼
Copy files to C:\Program Files\Poetry\
│
├── jre/                (Windows JRE 21)
├── pgsql/              (PostgreSQL 16 binaries)
├── native/rte-x64/     (U.are.U RTE MSI)
├── static/             (React frontend dist/)
├── poetry-backend.jar  (Spring Boot)
├── poetry-launcher.jar (Launcher wrapper)
└── Poetry.bat          (Entry point)
│
▼
┌──────────────────────────────────────┐
│  Post-Install: Silent RTE MSI        │
│  (check registry → install if needed)│
└──────────────────────────────────────┘
│
▼
Create Windows shortcuts
│
├── Start Menu\Poetry → Poetry.bat
└── Desktop\Poetry → Poetry.bat
│
▼
✓ Installation complete
```

## Runtime Flow (App Launch)

```
User clicks "Poetry" shortcut / Poetry.bat
│
▼
┌─────────────────────────────────────────┐
│ launcher.bat                            │
│ → Resolve APP_HOME                      │
│ → Call javaw.exe -jar launcher.jar      │
└─────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────┐
│ PoetryLauncher.main()                   │
│ - appDir:  C:\Program Files\Poetry\     │
│ - dataDir: %LOCALAPPDATA%\Poetry\       │
└─────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────┐
│ 1. EmbeddedPostgres.start()             │
│    - Locate pgsql/bin/pg_ctl.exe        │
│    - initdb (one-time)                  │
│    - pg_ctl start (port 5433)           │
│    → Listen on localhost:5433           │
└─────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────┐
│ 2. BackendRunner.start()                │
│    - java -Xmx512m -jar backend.jar     │
│    - --spring.profiles.active=desktop   │
│    - --db.host=localhost:5433           │
│    - --server.port=8080                 │
│    → Serves /api/** + /* (SPA)          │
└─────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────┐
│ 3. Wait 4s (backend startup)            │
└─────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────┐
│ 4. BrowserOpener.open()                 │
│    - Open http://localhost:8080         │
│    - Browser loads React SPA            │
└─────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────┐
│ 5. TrayManager.install()                │
│    - System tray icon (Poetry)          │
│    - Right-click menu:                  │
│      * Open Browser                     │
│      * Exit Poetry (shutdown all)       │
└─────────────────────────────────────────┘
│
▼
✓ App running - User can work
```

## Data & Process Architecture

```
┌──────────────────────────────────────────┐
│  C:\Program Files\Poetry\                │ (Read-Only, Installed)
│  ├── jre/                                │
│  ├── pgsql/                              │
│  ├── native/rte-x64/                     │
│  ├── static/                             │
│  ├── poetry-backend.jar                  │
│  ├── poetry-launcher.jar                 │
│  └── Poetry.bat                          │
└──────────────────────────────────────────┘
          │
          │ (Runs as)
          ▼
   ┌─────────────────┐
   │ launcher.bat    │
   │ [Administrator] │
   └─────────────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
PostgreSQL  Spring Boot
(Port 5433) (Port 8080)
    │           │
    └─────┬─────┘
          │
          ▼
    Browser at
  localhost:8080
          │
          └──▶ React SPA
              (static/)
              │
              └──▶ /api/v1/*
                  (Spring Boot)
                  │
                  └──▶ PostgreSQL


┌──────────────────────────────────────────┐
│  %LOCALAPPDATA%\Poetry\                  │ (Read-Write, User Data)
│  ├── pgdata/                             │ (Database files)
│  ├── uploads/carousel/                   │ (Media)
│  └── rte-install.log                     │ (Diagnostics)
└──────────────────────────────────────────┘
```

## Shutdown Flow

```
User clicks "Exit Poetry" in tray / closes launcher
│
▼
ShutdownHook registered in EmbeddedPostgres
│
├─▶ pg_ctl stop -D pgdata -m fast
│   └─▶ PostgreSQL graceful shutdown
│
├─▶ Backend process.destroy()
│   └─▶ Spring Boot shutdown
│
└─▶ All child processes terminate
   └─▶ JVM exits
       └─▶ App fully closed
```

## Error Handling & Recovery

```
┌────────────────────────────────────────┐
│ PG binaries missing?                   │
│ → Exception: pgsql/bin/pg_ctl.exe      │
│ → User sees console error              │
│ → Reinstall or check app integrity    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ PG already initialized?                │
│ → Check pgdata/PG_VERSION              │
│ → Skip initdb                          │
│ → Start server with existing data      │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Backend port 8080 in use?              │
│ → Spring Boot fails to bind            │
│ → User sees error, tries again         │
│ → Can change port in application.yml   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ RTE drivers already installed?         │
│ → Inno Setup checks registry           │
│ → Skips silent MSI install if present  │
│ → No conflicts, no reinstall           │
└────────────────────────────────────────┘
```

All Rights Reserved. Arodi Emmanuel
