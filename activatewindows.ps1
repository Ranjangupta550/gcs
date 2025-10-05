param(
    [string]$targetTitle,
    [string]$exePath = "notepad.exe"
)

# App ko uske window title se dhoondho
$process = Get-Process | Where-Object { $_.MainWindowTitle -like "*$targetTitle*" -and $_.MainWindowHandle -ne 0 } | Select-Object -First 1

# Agar app nahi chal raha hai, to use start karo
if (-not $process) {
    Write-Output "App '$targetTitle' nahi chal raha hai, launch kiya ja raha hai..."
    Start-Process $exePath
    Write-Output "✅ App '$targetTitle' start ho gaya hai"
}
# Agar app chal raha hai, to use saamne lao
else {
    $hwnd = $process.MainWindowHandle

    # Windows API functions ko add karo
    Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@

    # Pehle window ko restore karo (agar minimize hai to)
    # 9 ka matlab hai SW_RESTORE (window ko normal size mein lao)
    [WinAPI]::ShowWindow($hwnd, 9) | Out-Null

    # Ab WScript.Shell ka istemaal karke window ko zabardasti saamne lao
    # Yeh SetForegroundWindow se zyada reliable hai
    try {
        $wshell = New-Object -ComObject WScript.Shell
        $wshell.AppActivate($process.MainWindowTitle)
        Write-Output "✅ Window '$targetTitle' ab active hai"
    } catch {
        Write-Output "❌ Window '$targetTitle' ko activate nahi kar paaye"
    }
}