# File: detect-com-ports.ps1
# Purpose: Detect available COM ports and identify FTDI
# All Rights Reserved. Arodi Emmanuel

Write-Host "Detecting COM Ports..." -ForegroundColor Green
Write-Host ""

$ports = Get-WmiObject Win32_SerialPort | Select-Object DeviceID, Description, PNPDeviceID

if ($ports.Count -eq 0) {
    Write-Host "No COM ports detected." -ForegroundColor Red
    Write-Host "Please ensure your USB-TTL adapter is connected." -ForegroundColor Yellow
    Read-Host "`nPress Enter to exit"
    exit 1
}

Write-Host "Found COM ports:" -ForegroundColor Cyan
Write-Host ""

$ftdiPort = $null

foreach ($port in $ports) {
    Write-Host "Port: $($port.DeviceID)" -ForegroundColor White
    Write-Host "  Description: $($port.Description)"
    Write-Host "  PNP ID: $($port.PNPDeviceID)"
    Write-Host ""
    
    if ($port.Description -like "*FTDI*" -or $port.Description -like "*FT232*") {
        $ftdiPort = $port.DeviceID
        Write-Host "  *** FTDI USB-TTL Adapter Detected ***" -ForegroundColor Green
        Write-Host ""
    }
}

if ($ftdiPort) {
    Write-Host "Recommended configuration:" -ForegroundColor Yellow
    Write-Host "USB_TTL_PORT=$ftdiPort" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Add this to your .env file in poetry-hardware/" -ForegroundColor Yellow
} else {
    Write-Host "FTDI adapter not found. Available ports listed above." -ForegroundColor Yellow
}

Read-Host "`nPress Enter to exit"
