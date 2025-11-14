# kill-port-processes.ps1
# Kills processes using specified COM port
# All Rights Reserved. Arodi Emmanuel

param(
    [string]$ComPort = "COM3"
)

Write-Host "Checking for processes using $ComPort..." -ForegroundColor Yellow

# Find Node.js processes that might have the port open
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    Write-Host "Found $($nodeProcesses.Count) Node.js process(es)" -ForegroundColor Cyan
    
    foreach ($proc in $nodeProcesses) {
        try {
            $procInfo = Get-Process -Id $proc.Id -FileVersionInfo -ErrorAction SilentlyContinue
            Write-Host "  PID $($proc.Id): $($procInfo.FileName)" -ForegroundColor Gray
            
            # Kill the process
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
            Write-Host "  OK Killed PID $($proc.Id)" -ForegroundColor Green
        }
        catch {
            Write-Host "  ERROR Could not kill PID $($proc.Id)" -ForegroundColor Red
        }
    }
    
    # Wait a moment for ports to be released
    Start-Sleep -Milliseconds 500
    Write-Host "Port cleanup complete" -ForegroundColor Green
}
else {
    Write-Host "No Node.js processes found" -ForegroundColor Green
}
