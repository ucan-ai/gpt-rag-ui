# SuperDoc Run Script for Windows

# Check for Python and Node.js
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Error "Python is not installed or not in PATH"
    exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js/npm is not installed or not in PATH"
    exit 1
}

$mode = $args[0]

if ($mode -eq "backend") {
    Write-Host "Starting backend only..."
    Set-Location -Path .\superdoc-backend
    python -m pip install -r requirements.txt
    python -m chainlit run app.py
}
elseif ($mode -eq "frontend") {
    Write-Host "Starting frontend only..."
    Set-Location -Path .\superdoc-frontend
    npm install
    npm run dev
}
else {
    # Start both in separate windows
    Write-Host "Starting both backend and frontend..."
    
    # Start backend in new window
    Start-Process powershell -ArgumentList "-Command `"Set-Location -Path '$(Get-Location)\superdoc-backend'; python -m pip install -r requirements.txt; python -m chainlit run app.py; Read-Host -Prompt 'Press Enter to exit'`""
    
    # Start frontend in new window
    Start-Process powershell -ArgumentList "-Command `"Set-Location -Path '$(Get-Location)\superdoc-frontend'; npm install; npm run dev; Read-Host -Prompt 'Press Enter to exit'`""
    
    Write-Host "Started both services in separate windows."
} 