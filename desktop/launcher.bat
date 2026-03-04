@echo off
rem File: launcher.bat
rem Purpose: Entry point for the installed Poetry desktop app.
rem Uses the bundled Windows JRE to run the launcher JAR which
rem starts PostgreSQL, backend, and opens the browser.
rem All Rights Reserved Arodi Emmanuel

set "APP_HOME=%~dp0"
if "%APP_HOME:~-1%"=="\" set "APP_HOME=%APP_HOME:~0,-1%"
set "JAVA=%APP_HOME%\jre\bin\javaw.exe"

start "" "%JAVA%" ^
  -Xmx512m ^
  "-Dpoetry.home=%APP_HOME%" ^
  -jar "%APP_HOME%\poetry-launcher.jar"
