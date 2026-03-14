@echo off
rem File: run-java-dev.bat
rem Purpose: Build frontend in desktop mode.
rem Copy dist into backend static resources.
rem Run Spring Boot with desktop profile.
rem All Rights Reserved Arodi Emmanuel

setlocal
cd /d "%~dp0.."

set "FRONT=poetry-frontend"
set "BACK=poetry-backend"
set "STATIC=%BACK%\src\main\resources\static"
set "DB_USER=poetry"
set "DB_NAME=poetry"
set "DB_PASSWORD=poetry_desktop"
set "PG_BIN=%ProgramFiles%\Poetry\pgsql\bin"
set "PG_DATA=%LOCALAPPDATA%\Poetry\pgdata"
set "DB_PORT=5433"

echo [0/3] Checking PostgreSQL on localhost:%DB_PORT%...
powershell -NoProfile -Command ^
  "$ok=Test-NetConnection localhost -Port %DB_PORT% -WarningAction SilentlyContinue; if($ok.TcpTestSucceeded){exit 0}else{exit 1}"
if errorlevel 1 (
  if exist "%PG_BIN%\pg_ctl.exe" (
    echo Starting bundled PostgreSQL from Program Files...
    if not exist "%PG_DATA%\PG_VERSION" (
      "%PG_BIN%\initdb.exe" -D "%PG_DATA%" -U "%DB_USER%" -A trust
    )
    "%PG_BIN%\pg_ctl.exe" start -D "%PG_DATA%" -o "-p %DB_PORT%" -w -t 30
    "%PG_BIN%\createdb.exe" -p %DB_PORT% -U "%DB_USER%" "%DB_NAME%"
  )
  powershell -NoProfile -Command ^
    "$ok=Test-NetConnection localhost -Port %DB_PORT% -WarningAction SilentlyContinue; if($ok.TcpTestSucceeded){exit 0}else{exit 1}"
  if errorlevel 1 (
    goto :dbfail
  )
)

echo [1/3] Building desktop frontend...
cd "%FRONT%"
call npx vite build --mode desktop
if errorlevel 1 goto :fail
cd ..

echo [2/3] Syncing static files...
if exist "%STATIC%" rmdir /s /q "%STATIC%"
mkdir "%STATIC%"
xcopy /e /i /y "%FRONT%\dist\*" "%STATIC%\"
if errorlevel 1 goto :fail

echo [3/3] Starting Java backend...
cd "%BACK%"
set "DB_USERNAME=%DB_USER%"
set "DB_PASSWORD=%DB_PASSWORD%"
powershell -NoProfile -Command ^
  "$c=Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1; if(-not $c){exit 0}; $p=Get-CimInstance Win32_Process -Filter ('ProcessId=' + $c.OwningProcess); $cmd=($p.CommandLine + '').ToLowerInvariant(); if($cmd.Contains('poetry-backend')){Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue; Start-Sleep -Seconds 1; exit 0}else{exit 2}"
if errorlevel 2 goto :portbusy
call mvnw spring-boot:run ^
  "-DskipTests" ^
  "-Dspring-boot.run.profiles=desktop" ^
  "-Dspring-boot.run.arguments=--db.port=%DB_PORT% --spring.jpa.hibernate.ddl-auto=update --membership.bootstrap.enabled=false --membership.bootstrap.count=0 --zone.bootstrap.count=0 --admin.bootstrap.injectSampleUsers=false"
if errorlevel 1 goto :fail
exit /b 0

:portbusy
echo.
echo Port 8080 is busy by another app.
echo Stop that app and run again.
pause
exit /b 1

:dbfail
echo.
echo Could not start PostgreSQL.
echo Start Poetry DB on port %DB_PORT% and retry.
pause
exit /b 1

:fail
echo.
echo Desktop dev launch failed.
pause
exit /b 1
