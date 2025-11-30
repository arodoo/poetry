:: install-r503pro-driver.bat
:: Installs WinUSB driver for R503Pro-USB fingerprint module
:: Run as Administrator
::
@echo off
echo ============================================
echo  R503Pro-USB Driver Installer
echo ============================================
echo.
echo Este script instalara el driver WinUSB para
echo el modulo de huella R503Pro-USB.
echo.
echo VID: 4612, PID: 04B4
echo.
pause

cd /d "%~dp0"

echo.
echo Agregando driver al almacen de Windows...
pnputil /add-driver "R503Pro-WinUSB.inf" /install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [OK] Driver instalado correctamente.
    echo Desconecta y reconecta el dispositivo USB.
) else (
    echo.
    echo [ERROR] No se pudo instalar el driver.
    echo Puede que necesites desactivar la firma de drivers.
    echo.
    echo Alternativa: Usa Zadig manualmente.
)

echo.
pause
