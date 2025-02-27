# Example Python backend using Flask-SocketIO
from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

# Simulate continuous telemetry updates
def send_telemetry():
    while True:
        # Replace this with actual telemetry data from your drone
        telemetry_data = {
            "altitude": 100.5,
            "yaw": 45.0,
            "longitude": 77.23,
            "latitude": 28.61,
            "climb_rate": 2.5,
            "groundspeed": 10.0,
            "airspeed": 15.0,
            "battery": {"current": 12.5},
            "gps": {"satellites": 10},
            "system": {"flight_mode": "Stabilize"}
        }
        socketio.emit("telemetry_update", telemetry_data)  # Send telemetry data to all clients
        socketio.sleep(0.5)  # Send updates every 500ms

# Start telemetry updates in a background thread
socketio.start_background_task(send_telemetry)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)