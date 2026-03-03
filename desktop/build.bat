@echo off
rem File: build.bat
rem Purpose: One-command build for the Poetry desktop installer.
rem Requires ONLY Docker. Produces PoetrySetup-1.0.0.exe in
rem desktop/output/. No JDK, Node, Maven, or WiX needed.
rem All Rights Reserved Arodi Emmanuel

echo =============================================
echo   Poetry Desktop Installer Build
echo   Requires: Docker (only)
echo =============================================
echo.

cd /d "%~dp0.."

echo [1/2] Building installer via Docker...
docker build ^
  -f desktop/Dockerfile ^
  --output type=local,dest=desktop/output ^
  .

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo [ERROR] Build failed. Is Docker running?
  exit /b 1
)

echo.
echo =============================================
echo   Done: desktop\output\PoetrySetup-1.0.0.exe
echo =============================================
