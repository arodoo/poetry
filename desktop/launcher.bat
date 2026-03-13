@echo off
rem File: launcher.bat
rem Purpose: Entry point for the installed Poetry desktop app.
rem Uses the bundled Windows JRE to run the launcher JAR which
rem starts PostgreSQL, backend, and opens the browser.
rem All Rights Reserved Arodi Emmanuel

set "APP_HOME=%~dp0"
if "%APP_HOME:~-1%"=="\" set "APP_HOME=%APP_HOME:~0,-1%"
set "JAVA=%APP_HOME%\jre\bin\javaw.exe"
set "DATA_HOME=%LOCALAPPDATA%\Poetry"
if not defined LOCALAPPDATA set "DATA_HOME=%USERPROFILE%\Poetry"
set "LOG_DIR=%DATA_HOME%\logs"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"
set "BOOT_LOG=%LOG_DIR%\launcher-bootstrap.log"

echo [%date% %time%] Poetry launcher start>>"%BOOT_LOG%"
if not exist "%JAVA%" (
  echo Missing bundled JRE: %JAVA%>>"%BOOT_LOG%"
  exit /b 1
)
if not exist "%APP_HOME%\poetry-launcher.jar" (
  echo Missing launcher JAR in %APP_HOME%>>"%BOOT_LOG%"
  exit /b 1
)

start "" "%JAVA%" ^
  -Xmx512m ^
  "-Dpoetry.home=%APP_HOME%" ^
  "-Dpoetry.log.dir=%LOG_DIR%" ^
  -jar "%APP_HOME%\poetry-launcher.jar"
