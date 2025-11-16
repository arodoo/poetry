# File: install-r503-winusb.ps1
# Purpose: Install WinUSB driver for R503 using Zadig
# All Rights Reserved. Arodi Emmanuel

#Requires -RunAsAdministrator

Write-Host "R503 WinUSB Driver Installer" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

$zadigUrl = "https://github.com/pbatard/libwdi/releases/download/v1.5.0/zadig-2.8.exe"
$zadigPath = "$env:TEMP\zadig.exe"

Write-Host "[1/3] Downloading Zadig..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $zadigUrl -OutFile $zadigPath -UseBasicParsing
Write-Host "Downloaded: $zadigPath" -ForegroundColor Green

Write-Host ""
Write-Host "[2/3] Launching Zadig..." -ForegroundColor Yellow
Write-Host ""
Write-Host "INSTRUCCIONES:" -ForegroundColor Cyan
Write-Host "1. En Zadig, ve a Options > List All Devices" -ForegroundColor White
Write-Host "2. Selecciona 'Finger Module USB Device' en el dropdown" -ForegroundColor White
Write-Host "3. En el campo del driver (flechas verdes), selecciona 'WinUSB'" -ForegroundColor White
Write-Host "4. Click en 'Replace Driver' o 'Install Driver'" -ForegroundColor White
Write-Host "5. Espera a que termine y cierra Zadig" -ForegroundColor White
Write-Host ""

Start-Process -FilePath $zadigPath -Wait

Write-Host ""
Write-Host "[3/3] Verificando instalación..." -ForegroundColor Yellow

Start-Sleep -Seconds 2

$r503 = Get-PnpDevice -PresentOnly | Where-Object {
    $_.FriendlyName -like "*Finger*" -or
    $_.FriendlyName -like "*R503*" -or
    $_.FriendlyName -like "*WinUsb*"
}

if ($r503) {
    Write-Host ""
    Write-Host "Dispositivo encontrado:" -ForegroundColor Green
    Write-Host "  $($r503.FriendlyName)" -ForegroundColor White
    Write-Host "  Clase: $($r503.Class)" -ForegroundColor White
    
    if ($r503.Class -eq "USBDevice" -or $r503.FriendlyName -like "*WinUsb*") {
        Write-Host ""
        Write-Host "✅ WinUSB instalado correctamente!" -ForegroundColor Green
        Write-Host ""
        Write-Host "El R503 ahora puede comunicarse via libusb/WinUSB" -ForegroundColor Cyan
        Write-Host "Necesitarás usar una librería como 'usb' de npm en lugar de serialport" -ForegroundColor Yellow
    }
} else {
    Write-Host "No se detectó cambio. Verifica que instalaste el driver en Zadig." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit"
