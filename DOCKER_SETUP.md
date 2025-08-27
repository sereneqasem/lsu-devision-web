# LSU Devision Web - Docker Setup Guide

This guide will help you set up and run the LSU Devision Web application using Docker.

## Prerequisites

- Windows 10/11 64-bit (Pro, Enterprise, or Education)
- At least 4GB of RAM (8GB+ recommended)
- Administrator access
- Internet connection

## Installation Steps

### 1. Enable WSL 2 (Windows Subsystem for Linux 2)

1. Open PowerShell as Administrator and run:
   ```powershell
   wsl --install
   ```
2. Restart your computer when prompted
3. After restart, WSL 2 will complete the installation automatically

### 2. Install Docker Desktop

1. Download Docker Desktop for Windows from: 
   [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Run the installer and follow the setup wizard
3. When prompted, make sure to check "Use WSL 2 instead of Hyper-V"
4. Launch Docker Desktop after installation
5. Wait for Docker to start (you'll see the Docker icon in the system tray)

### 3. Download and Run the Application

1. Download the application files from the provided source
2. Extract the files to a folder on your computer
3. Open File Explorer and navigate to the extracted folder
4. Double-click on `start_application.bat`
   - This will automatically start all required services
   - A browser window should open automatically with the application

## Accessing the Application

- **Main Application**: [http://localhost:8000](http://localhost:8000)
- **Admin Interface**: [http://localhost:8000/admin](http://localhost:8000/admin) (if you have admin credentials)

## Running the Application

### First-Time Setup

1. Ensure Docker is running
2. Open a terminal and navigate to the backend directory:
   ```bash
   cd lsu-devision-web/backend
   ```
3. Start the application:
   ```bash
   docker-compose up -d
   ```
4. Access the application:
   - Web Interface: [http://localhost:8000](http://localhost:8000)
   - Admin Interface: [http://localhost:8000/admin](http://localhost:8000/admin) (if you have admin credentials)

### Using Docker Desktop (After First Run)

After the initial setup, you can manage the application using Docker Desktop:

1. **Start/Stop Containers**:
   - Open Docker Desktop
   - Go to the "Containers" section
   - Find the containers starting with `backend-`
   - Use the start/stop buttons to control them

2. **View Logs**:
   - Click on a container in Docker Desktop
   - Go to the "Logs" tab to view container output

3. **Open in Terminal**:
   - Select a container
   - Click the "CLI" button to open a terminal session

4. **Resource Usage**:
   - View CPU, memory, and network usage in the "Stats" tab

### Command Line Alternative

You can also continue using the command line if preferred:

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

## Common Commands

### Start the Application
Double-click `start_application.bat` or run:
```bash
docker-compose up -d
```

### Stop the Application
Run:
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

## Troubleshooting

### Docker Desktop won't start
- Ensure WSL 2 is properly installed
- Check that virtualization is enabled in BIOS
- Restart your computer

### Port conflicts
Make sure ports 8000 and 6379 are not in use by other applications.

### Check if Docker is running
Open Command Prompt and type:
```bash
docker --version
docker-compose --version
```
You should see version numbers if Docker is installed correctly.

## Support

For additional help, please contact [support contact information].

---
*Last updated: August 2025*
