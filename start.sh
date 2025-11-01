######################################################################
# Project setup script
# - Ensures Node.js 20 via NVM
# - Installs dependencies for frontend and backend
# - Starts both servers in the background
# - Saves logs for debugging
######################################################################
#!/bin/bash

set -e

echo "🚀 Starting project setup..."

# --- Load or Install NVM ---
if ! command -v nvm &> /dev/null; then
  echo "⚙️ NVM not found. Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# --- Use Node 20 ---
if ! nvm ls 20 &>/dev/null; then
  echo "⬇️ Installing Node.js 20..."
  nvm install 20
fi
echo "🔧 Using Node.js 20..."
nvm use 20

# --- Frontend Setup ---
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "▶️ Starting frontend..."
npm run dev > ../frontend.log 2>&1 &
FRONT_PID=$!

# --- Backend Setup ---
cd ../backend
echo "📦 Installing backend dependencies..."
npm install

echo "▶️ Starting backend..."
node server.js > ../backend.log 2>&1 &
BACK_PID=$!

# --- Done ---
echo "✅ Setup complete!"
echo "   Frontend running (PID: $FRONT_PID) → log: frontend.log"
echo "   Backend running (PID: $BACK_PID) → log: backend.log"
echo ""
echo "💡 Tip: Run ./stop.sh to stop both servers."
