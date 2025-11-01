#!/bin/bash

set -e

echo "🚀 Starting project setup..."

# Check if nvm is installed
if ! command -v nvm &> /dev/null
then
  echo "⚙️ NVM not found. Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  # Load NVM into current shell session
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Ensure Node.js 20 is installed
if ! nvm ls 20 &>/dev/null; then
  echo "⬇️ Installing Node.js 20..."
  nvm install 20
fi

# Use Node.js 20
echo "🔧 Using Node.js 20..."
nvm use 20

# Move into frontend and start it
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "▶️ Starting frontend..."
npm run dev &

# Go back and setup backend
cd ../backend
echo "📦 Installing backend dependencies..."
npm install

echo "▶️ Starting backend..."
node server.js &

echo "✅ Setup complete! Frontend and backend are running."
