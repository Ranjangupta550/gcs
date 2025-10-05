param(
    [string]$targetTitle,
    [string]$exePath = "notepad.exe"  # default to Notepad
)

# Find running process
$processes = Get-Process | Where-Object { $_.MainWindowTitle -like "*$targetTitle*" -and $_.MainWindowHandle -ne 0 }

# Launch app if not running
if (-not $processes) {
    Write-Output "App '$targetTitle' not running, launching..."
    Start-Process $exePath
    Start-Sleep -Seconds 1
    $processes = Get-Process | Where-Object { $_.MainWindowTitle -like "*$targetTitle*" -and $_.MainWindowHandle -ne 0 }
}

# Activate window if found
if ($processes) {
    foreach ($p in $processes) {
        $hwnd = $p.MainWindowHandle
        # Add Windows API functions
        Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
    [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@
        # Restore if minimized (2 = SW_RESTORE) and bring to front
        [WinAPI]::ShowWindowAsync($hwnd, 2) | Out-Null
        [WinAPI]::SetForegroundWindow($hwnd) | Out-Null
    }
    Write-Output "✅ Window '$targetTitle' is now active"
} else {
    Write-Output "❌ Could not activate or start '$targetTitle'"
}
