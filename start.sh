#!/bin/bash

# Stone Portfolio - Quick Start Script
# Quick Start Script for Portfolio Website

echo "Starting Stone's Portfolio Website..."
echo "Starting Stone's Portfolio Website..."
echo ""

# Check if running in correct directory
if [ ! -f "package.json" ]; then
    echo "Error: Please run this script from the project root directory"
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first"
    echo "Node.js is not installed. Please install Node.js first"
    echo "Download: https://nodejs.org/"
    exit 1
fi

echo "Node.js version: $(node --version)"
echo "Node.js version: $(node --version)"
echo ""

# Check if node_modules exists, install dependencies if not
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Display project information
echo "Project Info:"
echo "   Name: Stone Portfolio"
echo "   Version: 1.0.0"
echo "   Description: Technology × Music × Innovation"
echo ""

# Start development server
echo "Starting development server..."
echo "Starting development server..."
echo ""
echo "Instructions:"
echo "   - Local: http://localhost:5173"
echo "   - Press Ctrl+C to stop the server"
echo "   - File changes will auto-reload"
echo ""
echo "Website includes:"
echo "   - Technology: AI Research & ML Projects"
echo "   - Performance: Jazz Piano & Classical Clarinet"
echo "   - Music Tech: RAVE Model & Music Production"
echo ""

# Start development server
npm run dev