const WebSocket = require('ws');
const express = require('express');
const app = express();

const server = app.listen(3001, () => {
    console.log(`Stream server running on port 3001`);
});

const wss = new WebSocket.Server({ server });

// Handle upstream connection from Python
let pythonConnection = null;

wss.on('connection', (ws, req) => {
    const path = req.url;
    
    // Python upstream connection
    if (path === '/upstream') {
        pythonConnection = ws;
        pythonConnection.on('close', () => pythonConnection = null);
        return;
    }

    // React client connections
    ws.on('message', (message) => {
        if (pythonConnection) {
            pythonConnection.send(message);
        }
    });

    // Cleanup
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Serve static files (React build)
app.use(express.static('build'));