# Poetry Desktop Installer

Produces a single Windows `.exe` installer that bundles the
entire Poetry stack. **Docker is the only build prerequisite.**
The end user installs nothing manually.

## Build Prerequisites

- Docker (that's it)

## End-User Prerequisites

- Windows 10/11 x64 (nothing else to install)

## Build the Installer

```bat
cd desktop
build.bat
```

Or from Linux/macOS CI:

```bash
cd desktop && chmod +x build.sh && ./build.sh
```

Output: `desktop/output/PoetrySetup-1.0.0.exe`

## What Docker Builds (Multi-Stage)

| Stage | Base Image | Produces |
|-------|-----------|----------|
| backend | eclipse-temurin:21-jdk | Fat JAR |
| frontend | node:20-alpine | Static dist/ |
| launcher | eclipse-temurin:21-jdk | Launcher JAR |
| jre | eclipse-temurin:21-jdk | Minimal JRE (jlink) |
| bundler | alpine:3.19 | App bundle + PG16 |
| installer | amake/innosetup:6 | `.exe` installer |

## What the End User Gets

Double-click `PoetrySetup-1.0.0.exe`:

1. Installs to `C:\Program Files\Poetry\`
2. Silently installs U.are.U RTE fingerprint drivers
3. Creates Start Menu + optional Desktop shortcut
4. On launch: starts PG, backend, opens browser
5. System tray icon for status and clean shutdown

## Runtime Data

`%LOCALAPPDATA%\Poetry\` — database, logs, uploads.

All Rights Reserved. Arodi Emmanuel
