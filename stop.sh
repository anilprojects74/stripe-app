#!/bin/bash

echo "🛑 Stopping frontend and backend servers..."

# Stop frontend (Vite dev server)
FRONTEND_PID=$(lsof -ti:5173)
if [ -n "$FRONTEND_PID" ]; then
  echo "🔻 Stopping frontend (PID: $FRONTEND_PID)..."
  kill -9 $FRONTEND_PID
else
  echo "✅ No frontend server running on port 5173."
fi

# Stop backend (Node/Express)
BACKEND_PID=$(lsof -ti:5000)
if [ -n "$BACKEND_PID" ]; then
  echo "🔻 Stopping backend (PID: $BACKEND_PID)..."
  kill -9 $BACKEND_PID
else
  echo "✅ No backend server running on port 5000."
fi

echo "💤 All servers stopped successfully."

