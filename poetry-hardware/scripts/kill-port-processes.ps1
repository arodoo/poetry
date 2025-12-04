# kill-port-processes.ps1
# Kills poetry-hardware processes using specified COM port
# Preserves fingerprint-bridge (32-bit Node.js on port 3001)
# All Rights Reserved. Arodi Emmanuel

param(
    [string]$ComPort = "COM3"
)

Write-Host "Checking for processes using $ComPort..." -ForegroundColor Yellow

# Find Node.js processes (64-bit only - preserves 32-bit fingerprint-bridge)
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $procPath = $_.Path
    # Only kill 64-bit Node.js (skip if path contains x86 or PROGRA~2)
    $procPath -and $procPath -notlike "*x86*" -and $procPath -notlike "*PROGRA~2*"
}

if ($nodeProcesses) {
    Write-Host "Found $($nodeProcesses.Count) Node.js 64-bit process(es)" -ForegroundColor Cyan
    
    foreach ($proc in $nodeProcesses) {
        try {
            Write-Host "  PID $($proc.Id): $($proc.Path)" -ForegroundColor Gray
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
            Write-Host "  OK Killed PID $($proc.Id)" -ForegroundColor Green
        }
        catch {
            Write-Host "  SKIP Could not kill PID $($proc.Id)" -ForegroundColor Yellow
        }
    }
    
    Start-Sleep -Milliseconds 500
    Write-Host "Port cleanup complete" -ForegroundColor Green
}
else {
    Write-Host "No Node.js 64-bit processes found" -ForegroundColor Green
}
