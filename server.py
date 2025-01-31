from flask import Flask, request, jsonify
from drone_controller import DroneController

app = Flask(__name__)

# Create a DroneController instance
drone_controller = DroneController()

@app.route("/api/connect", methods=["POST"])
def connect():
    success = drone_controller.connect()
    if success:
        return jsonify({"status": "connected"})
    else:
        return jsonify({"status": "failed to connect"}), 400

@app.route("/api/disconnect", methods=["POST"])
def disconnect():
    success = drone_controller.disconnect()
    if success:
        return jsonify({"status": "disconnected"})
    else:
        return jsonify({"status": "failed to disconnect"}), 400

@app.route("/api/arm", methods=["POST"])
def arm():
    success = drone_controller.arm()
    if success:
        return jsonify({"status": "armed"})
    else:
        return jsonify({"status": "failed to arm"}), 400

@app.route("/api/disarm", methods=["POST"])
def disarm():
    success = drone_controller.disarm()
    if success:
        return jsonify({"status": "disarmed"})
    else:
        return jsonify({"status": "failed to disarm"}), 400

@app.route("/api/throttle", methods=["POST"])
def throttle():
    data = request.get_json()
    action = data.get("action")
    success = drone_controller.throttle(action)
    if success:
        return jsonify({"status": f"throttle {action}"})
    else:
        return jsonify({"status": "failed to change throttle"}), 400

@app.route("/api/yaw", methods=["POST"])
def yaw():
    data = request.get_json()
    action = data.get("action")
    success = drone_controller.yaw(action)
    if success:
        return jsonify({"status": f"yaw {action}"})
    else:
        return jsonify({"status": "failed to change yaw"}), 400

if __name__ == "__main__":
    app.run(debug=True)
