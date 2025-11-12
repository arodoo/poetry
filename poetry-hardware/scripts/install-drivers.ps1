# File: install-drivers.ps1
# Purpose: Install FTDI drivers for USB-TTL adapter
# All Rights Reserved. Arodi Emmanuel

Write-Host "Installing FTDI USB-TTL Drivers..." -ForegroundColor Green

$driverUrl = "https://ftdichip.com/wp-content/uploads/2021/08/CDM212364_Setup.zip"
$downloadPath = "$env:TEMP\ftdi_driver.zip"
$extractPath = "$env:TEMP\ftdi_driver"

try {
    Write-Host "Downloading FTDI driver..."
    Invoke-WebRequest -Uri $driverUrl -OutFile $downloadPath

    Write-Host "Extracting driver..."
    Expand-Archive -Path $downloadPath -DestinationPath $extractPath -Force

    Write-Host "Installing driver..."
    $setupExe = Get-ChildItem -Path $extractPath -Filter "*.exe" -Recurse | Select-Object -First 1
    
    if ($setupExe) {
        Start-Process -FilePath $setupExe.FullName -Wait -NoNewWindow
        Write-Host "Driver installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "Setup file not found. Please install manually." -ForegroundColor Yellow
        Start-Process $extractPath
    }

    Write-Host "`nPlease reconnect your USB-TTL adapter now." -ForegroundColor Cyan
    Write-Host "Windows should automatically detect and configure it." -ForegroundColor Cyan

} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "Please download and install drivers manually from:" -ForegroundColor Yellow
    Write-Host "https://ftdichip.com/drivers/vcp-drivers/" -ForegroundColor Yellow
}

Read-Host "`nPress Enter to continue"
