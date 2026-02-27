@echo off
rem File: install-sdk-jar.bat
rem Purpose: Installs the DigitalPersona dpuareu.jar into the project-local
rem Maven repository (poetry-backend/libs). Run this once on a new machine
rem after extracting the project. Requires Maven installed.
rem All Rights Reserved Arodi Emmanuel

echo Installing DigitalPersona dpuareu SDK into local Maven repo...

mvn install:install-file ^
  -Dfile="poetry-backend\libs\dpuareu-3.2.0.jar" ^
  -DgroupId=com.digitalpersona ^
  -DartifactId=dpuareu ^
  -Dversion=3.2.0 ^
  -Dpackaging=jar ^
  -DlocalRepositoryPath="poetry-backend\libs"

echo Done. You can now build the backend with: cd poetry-backend ^&^& mvn package
