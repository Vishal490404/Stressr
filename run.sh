#!/bin/bash

cleanup() {
    PYTHON_PID=$(lsof -ti:9563)
    if [ ! -z "$PYTHON_PID" ]; then
        kill -9 "$PYTHON_PID"
    fi

    NPM_PID=$(lsof -ti:3000)
    if [ ! -z "$NPM_PID" ]; then
        kill -9 "$NPM_PID"
    fi
}

cleanup

cd Backend || { echo "Backend directory not found"; exit 1; }
python3 Server.py &  
cd - || exit 1  

cd Frontend/Stressr-Frontend || { echo "Frontend directory not found"; exit 1; }
npm run dev &  
cd - || exit 1  

wait
