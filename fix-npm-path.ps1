# Fix npm PATH issue - Run this in your PowerShell

# Common Node.js installation paths
$possiblePaths = @(
    "$env:ProgramFiles\nodejs",
    "$env:ProgramFiles(x86)\nodejs",
    "$env:LOCALAPPDATA\Programs\nodejs",
    "C:\Program Files\nodejs",
    "C:\Program Files (x86)\nodejs"
)

$nodePath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path "$path\node.exe") {
        $nodePath = $path
        Write-Host "Found Node.js at: $nodePath" -ForegroundColor Green
        break
    }
}

if ($nodePath) {
    # Add to PATH for current session
    $env:PATH = "$nodePath;$env:PATH"
    Write-Host "Added Node.js to PATH for this session" -ForegroundColor Green
    Write-Host "`nNow try running: npm install" -ForegroundColor Yellow
} else {
    Write-Host "Node.js not found in common locations. Please check your Node.js installation." -ForegroundColor Red
    Write-Host "`nTry running this to find Node.js:" -ForegroundColor Yellow
    Write-Host "Get-ChildItem -Path 'C:\Program Files' -Filter 'node.exe' -Recurse -ErrorAction SilentlyContinue | Select-Object FullName" -ForegroundColor Cyan
}
