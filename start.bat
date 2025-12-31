@echo off
chcp 65001 >nul

echo Starting Stone's Portfolio Website...
echo Starting Stone's Portfolio Website...
echo.

REM Check if running in correct directory
if not exist "package.json" (
    echo Error: Please run this script from the project root directory
    echo Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js is not installed. Please install Node.js first
    echo Node.js is not installed. Please install Node.js first
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node.js version: %NODE_VERSION%
echo Node.js version: %NODE_VERSION%
echo.

REM Check if node_modules exists, install dependencies if not
if not exist "node_modules" (
    echo Installing dependencies...
    echo Installing dependencies...
    call npm install
    echo.
)

REM Display project information
echo Project Info:
echo    Name: Stone Portfolio
echo    Version: 1.0.0
echo    Description: Technology × Music × Innovation
echo.

REM Start development server
echo Starting development server...
echo Starting development server...
echo.
echo Instructions:
echo    - Local: http://localhost:5173
echo    - Press Ctrl+C to stop the server
echo    - File changes will auto-reload
echo.
echo Website includes:
echo    - Technology: AI Research ^& ML Projects
echo    - Performance: Jazz Piano ^& Classical Clarinet
echo    - Music Tech: RAVE Model ^& Music Production
echo.

REM Start development server
call npm run dev