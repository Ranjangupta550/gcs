# import socket
# import struct
# import cv2
# import numpy as np
# import asyncio
# import websockets
# from pyzbar import pyzbar
# import json
# import base64

# class VideoProcessor:
#     def __init__(self):
#         self.window_name = "Live Video Stream"
#         self.clients = set()
#         print("✅ VideoProcessor initialized. Waiting for ESP32-CAM connection...")

#     def process_frame(self, frame):
#         """
#         Process the frame to detect QR codes and draw bounding boxes.
#         """
#         decoded_objects = pyzbar.decode(frame, symbols=[pyzbar.ZBarSymbol.QRCODE])  # Fix: Restrict to QR codes only
#         qr_data = None

#         for obj in decoded_objects:
#             qr_data = obj.data.decode("utf-8")
#             print(f"🔍 Detected QR Code: {qr_data}")

#             # Draw bounding box around the QR code
#             points = obj.polygon
#             if len(points) > 4:
#                 hull = cv2.convexHull(np.array([point for point in points], dtype=np.float32))
#                 cv2.polylines(frame, [hull], True, (0, 255, 0), 2)
#             else:
#                 cv2.polylines(frame, [np.array(points)], True, (0, 255, 0), 2)

#             # Display QR data on the frame
#             cv2.putText(frame, qr_data, (10, 30),
#                         cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

#         return frame, qr_data

#     async def handle_websocket(self, websocket, path):
#         """
#         Handle WebSocket connections from React clients.
#         """
#         self.clients.add(websocket)
#         print(f"✅ React client connected: {websocket.remote_address}")

#         try:
#             while True:
#                 message = await websocket.recv()
#                 print(f"📩 Received from React: {message}")
#         except websockets.exceptions.ConnectionClosed:
#             print("❌ React client disconnected")
#         finally:
#             self.clients.remove(websocket)

#     async def send_to_react(self, frame, qr_data):
#         """
#         Send processed frame and QR data to React clients.
#         """
#         if self.clients:
#             _, buffer = cv2.imencode('.jpg', frame)
#             b64_frame = base64.b64encode(buffer).decode()

#             message = {
#                 "type": "frame",
#                 "data": f"data:image/jpeg;base64,{b64_frame}",
#                 "qr_data": qr_data
#             }

#             for client in self.clients:
#                 try:
#                     await client.send(json.dumps(message))
#                 except Exception as e:
#                     print(f"⚠️ Error sending frame: {e}")

#     async def handle_esp_connection(self):
#         """
#         Handle incoming video stream from ESP32-CAM.
#         """
#         server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#         server.bind(('0.0.0.0', 8080))
#         server.listen(1)
#         print("🚀 TCP server started. Waiting for ESP32-CAM connection...")

#         while True:
#             conn, addr = server.accept()
#             print(f"✅ Connected to ESP32-CAM at {addr}")

#             try:
#                 while True:
#                     size_data = conn.recv(4)
#                     if len(size_data) != 4:
#                         print("⚠️ Invalid frame size received")
#                         break

#                     image_size = struct.unpack('<I', size_data)[0]
#                     data = b''

#                     while len(data) < image_size:
#                         packet = conn.recv(image_size - len(data))
#                         if not packet:
#                             break
#                         data += packet

#                     if len(data) != image_size:
#                         print("⚠️ Incomplete frame received")
#                         continue

#                     frame = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
#                     if frame is None:
#                         print("⚠️ Failed to decode frame")
#                         continue

#                     processed_frame, qr_data = self.process_frame(frame)
#                     await self.send_to_react(processed_frame, qr_data)

#                     cv2.imshow(self.window_name, processed_frame)
#                     if cv2.waitKey(1) & 0xFF == ord('q'):
#                         break

#             except Exception as e:
#                 print(f"⚠️ Error: {e}")
#             finally:
#                 conn.close()
#                 print("❌ ESP32-CAM disconnected")
#                 cv2.destroyAllWindows()

# async def main():
#     processor = VideoProcessor()

#     ws_server = await websockets.serve(processor.handle_websocket, "0.0.0.0", 5678)
#     print("✅ WebSocket server started on ws://0.0.0.0:5678")

#     await processor.handle_esp_connection()

#     ws_server.close()
#     await ws_server.wait_closed()

# if __name__ == "__main__":
#     asyncio.run(main())

import socket
import struct
import cv2
import numpy as np
import asyncio
import websockets
from pyzbar import pyzbar
import json
import base64

class VideoProcessor:
    def __init__(self):
        self.window_name = "Live Video Stream"
        self.clients = set()
        print("✅ VideoProcessor initialized. Waiting for ESP32-CAM connection...")

    def process_frame(self, frame):
        """
        Process the frame to detect QR codes and draw bounding boxes.
        """
        decoded_objects = pyzbar.decode(frame, symbols=[pyzbar.ZBarSymbol.QRCODE])  # Fix: Restrict to QR codes only
        qr_data = None

        for obj in decoded_objects:
            qr_data = obj.data.decode("utf-8")
            print(f"🔍 Detected QR Code: {qr_data}")

            # Draw bounding box around the QR code
            points = obj.polygon
            if len(points) > 4:
                hull = cv2.convexHull(np.array([point for point in points], dtype=np.float32))
                cv2.polylines(frame, [hull], True, (0, 255, 0), 2)
            else:
                cv2.polylines(frame, [np.array(points)], True, (0, 255, 0), 2)

            # Display QR data on the frame
            cv2.putText(frame, qr_data, (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        return frame, qr_data

async def handle_websocket(self, websocket, path):
    """Handle WebSocket connections from React clients."""
    self.clients.add(websocket)
    print(f"✅ React client connected: {websocket.remote_address}")

    try:
        await websocket.send(json.dumps({"type": "status", "message": "WebSocket Connected"}))
        while True:
            message = await websocket.recv()
            print(f"📩 Received from React: {message}")
    except websockets.exceptions.ConnectionClosed:
        print("❌ React client disconnected")
    finally:
        self.clients.remove(websocket)


    async def send_to_react(self, frame, qr_data):
        """
        Send processed frame and QR data to React clients.
        """
        if self.clients:
            _, buffer = cv2.imencode('.jpg', frame)
            b64_frame = base64.b64encode(buffer).decode()

            message = {
                "type": "frame",
                "data": f"data:image/jpeg;base64,{b64_frame}",
                "qr_data": qr_data
            }

            for client in self.clients:
                try:
                    await client.send(json.dumps(message))
                    print(f"📩 Sent frame to React client: {client.remote_address}")
                except Exception as e:
                    print(f"⚠️ Error sending frame: {e}")

    async def handle_esp_connection(self):
        """
        Handle incoming video stream from ESP32-CAM.
        """
        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server.bind(('0.0.0.0', 8080))
        server.listen(1)
        print("🚀 TCP server started. Waiting for ESP32-CAM connection...")

        while True:
            conn, addr = server.accept()
            print(f"✅ Connected to ESP32-CAM at {addr}")

            try:
                while True:
                    size_data = conn.recv(4)
                    if len(size_data) != 4:
                        print("⚠️ Invalid frame size received")
                        break

                    image_size = struct.unpack('<I', size_data)[0]
                    data = b''

                    while len(data) < image_size:
                        packet = conn.recv(image_size - len(data))
                        if not packet:
                            break
                        data += packet

                    if len(data) != image_size:
                        print("⚠️ Incomplete frame received")
                        continue

                    frame = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
                    if frame is None:
                        print("⚠️ Failed to decode frame")
                        continue

                    processed_frame, qr_data = self.process_frame(frame)
                    await self.send_to_react(processed_frame, qr_data)

                    cv2.imshow(self.window_name, processed_frame)
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break

            except Exception as e:
                print(f"⚠️ Error: {e}")
            finally:
                conn.close()
                print("❌ ESP32-CAM disconnected")
                cv2.destroyAllWindows()

async def main():
    processor = VideoProcessor()

    ws_server = await websockets.serve(processor.handle_websocket, "0.0.0.0", 3000)
    print("✅ WebSocket server started on ws://0.0.0.0:3000")

    await processor.handle_esp_connection()

    ws_server.close()
    await ws_server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())