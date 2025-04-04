# import asyncio
# import websockets
# import socket
# import struct
# import cv2
# import numpy as np
# import base64
# import json
# from pyzbar import pyzbar

# class ESP32CamStream:
#     def __init__(self, tcp_host="0.0.0.0", tcp_port=8080, ws_host="0.0.0.0", ws_port=3000):
#         self.tcp_host = tcp_host
#         self.tcp_port = tcp_port
#         self.ws_host = ws_host
#         self.ws_port = ws_port
#         self.clients = set()
#         print("✅ ESP32CamStream initialized.")

#     async def handle_websocket(self, websocket, path):
#         """Handles WebSocket connections with React UI."""
#         self.clients.add(websocket)
#         print(f"✅ React client connected: {websocket.remote_address}")
#         try:
#             await websocket.wait_closed()
#         except Exception as e:
#             print(f"⚠️ WebSocket Error: {e}")
#         finally:
#             self.clients.remove(websocket)

#     async def send_to_clients(self, frame, qr_data=None):
#         """Send the frame and QR data to all WebSocket clients."""
#         if self.clients:
#             _, buffer = cv2.imencode('.jpg', frame)
#             b64_frame = base64.b64encode(buffer).decode()
#             message = {
#                 "type": "frame",
#                 "data": f"data:image/jpeg;base64,{b64_frame}",
#                 "qr_data": qr_data if qr_data else None
#             }
#             for client in self.clients:
#                 try:
#                     await client.send(json.dumps(message))
#                 except Exception as e:
#                     print(f"⚠️ WebSocket send error: {e}")

#     def process_frame(self, frame):
#         """Detect QR codes and draw bounding boxes."""
#         decoded_objects = pyzbar.decode(frame, symbols=[pyzbar.ZBarSymbol.QRCODE])
#         qr_data = None
        
#         for obj in decoded_objects:
#             qr_data = obj.data.decode("utf-8")
#             print(f"🔍 Detected QR Code: {qr_data}")
#             points = obj.polygon
#             cv2.polylines(frame, [np.array(points)], True, (0, 255, 0), 2)
#             cv2.putText(frame, qr_data, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        
#         return frame, qr_data

#     async def handle_esp_stream(self):
#         """Receives video frames from ESP32-CAM via TCP."""
#         server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#         server.bind((self.tcp_host, self.tcp_port))
#         server.listen(1)
#         print(f"🚀 TCP server started. Waiting for ESP32-CAM on {self.tcp_host}:{self.tcp_port}...")

#         while True:
#             conn, addr = server.accept()
#             print(f"✅ ESP32-CAM connected: {addr}")
#             try:
#                 while True:
#                     size_data = conn.recv(4)
#                     if len(size_data) != 4:
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
#                         continue
#                     processed_frame, qr_data = self.process_frame(frame)
#                     await self.send_to_clients(processed_frame, qr_data)
#             except Exception as e:
#                 print(f"⚠️ Error: {e}")
#             finally:
#                 conn.close()
#                 print("❌ ESP32-CAM disconnected")

# async def main():
#     stream = ESP32CamStream()
#     ws_server = await websockets.serve(stream.handle_websocket, stream.ws_host, stream.ws_port)
#     print(f"✅ WebSocket server running on ws://{stream.ws_host}:{stream.ws_port}")
#     await stream.handle_esp_stream()
#     ws_server.close()
#     await ws_server.wait_closed()

# if __name__ == "__main__":
#     asyncio.run(main())




