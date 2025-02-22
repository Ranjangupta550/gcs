from flask import Flask, request
from flask_socketio import SocketIO, send

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    print('Client connected:', request.sid)
    send('Welcome! You are connected.', broadcast=True)

@socketio.on('message')
def handle_message(msg):
    print(f"Received message: {msg}")
    send(msg, broadcast=True)  # Broadcast message to all clients

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected:', request.sid)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
