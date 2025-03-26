# Stop script on errors
$ErrorActionPreference = "Stop"

### 🛠 Function: Check if Docker is running ###
function Check-DockerDaemon {
    try {
        docker info --format '{{json .}}' *> $null  # Suppress output
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Docker Daemon is running."
            return $true
        } else {
            Write-Host "[ERROR] Docker Daemon is NOT ready yet."
            return $false
        }
    } catch {
        Write-Host "[ERROR] Failed to check Docker engine status."
        return $false
    }
}

### 🛠 Function: Check if Docker Desktop is running ###
function Is-DockerDesktopRunning {
    try {
        $process = Get-Process -Name "Docker Desktop" -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "[INFO] Docker Desktop is running."
            return $true
        } else {
            Write-Host "[INFO] Docker Desktop is NOT running."
            return $false
        }
    } catch {
        Write-Host "[ERROR] Could not detect Docker Desktop."
        return $false
    }
}

### 🛠 Function: Start Docker Desktop ###
function Start-DockerDesktop {
    if (-not (Is-DockerDesktopRunning)) {
        Write-Host "[INFO] Starting Docker Desktop..."
        Start-Process -FilePath "C:\Program Files\Docker\Docker\Docker Desktop.exe"
        Start-Sleep -Seconds 5
    }
}

### 🛠 Function: Wait until Docker is fully started ###
function Wait-For-Docker {
    $maxRetries = 20  # Max. 20 attempts (6 seconds each)
    $retryDelay = 6
    $retryCount = 0

    Write-Host "[INFO] Waiting for Docker to fully start. This may take a few moments..."

    while ($retryCount -lt $maxRetries) {
        Start-Sleep -Seconds $retryDelay

        if (Check-DockerDaemon) {
            return $true  # Docker is running, continue!
        }

        Write-Host "[WAIT] Docker is still starting... Attempt $($retryCount+1) of $maxRetries"
        $retryCount++
    }

    Write-Host "[ERROR] Docker did not start after multiple attempts. Please check Docker Desktop manually."
    exit 1
}

### 🛠 Function: Start Docker Daemon ###
function Start-DockerDaemon {
    if (Check-DockerDaemon) {
        return
    }

    Write-Host "[INFO] Checking Docker Desktop..."
    Start-DockerDesktop

    # Wait until Docker is fully running
    Wait-For-Docker

    # Final safety check
    if (-not (Check-DockerDaemon)) {
        Write-Host "[ERROR] Docker Daemon failed to start. Please start it manually."
        exit 1
    }
}

### 🛠 Function: Display Docker container status (without extra window) ###
function Show-DockerStatus {
    Write-Host "`n=== Current Docker Containers ===" -ForegroundColor Cyan
    docker ps --format "ID: {{.ID}} | IMAGE: {{.Image}} | STATUS: {{.Status}} | PORTS: {{.Ports}}"
    Write-Host "===================================" -ForegroundColor Cyan
}

# 🚀 Start Docker Daemon (if not already running)
Start-DockerDaemon

# 🚀 Start Docker-Compose to bring up all containers
Write-Host "[INFO] Starting all containers with docker-compose..."
docker-compose up --build -d

# 🚀 Display the current Docker containers once (without popup)
Show-DockerStatus

Write-Host "[OK] Docker Setup completed successfully!"