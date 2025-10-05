// rtspStreamer.cjs

const Stream = require('node-rtsp-stream');

// This variable will only be accessible within this file.
let stream;

/**
 * Starts the RTSP to WebSocket stream server.
 */
function start() {
  // Prevent starting a new stream if one is already running
  if (stream) {
    console.log('Stream is already running.');
    return;
  }
  
  console.log('🚀 Starting RTSP to WebSocket stream...');
  stream = new Stream({
    name: 'GCS Video Feed',
    streamUrl: 'rtsp://192.168.144.25:8554/main.264', // Your RTSP URL
    wsPort: 9999, // The WebSocket port for React to connect to
    ffmpegOptions: {
      '-stats': '',
      '-r': 30, // Frame rate
    },
  });
}

/**
 * Stops the stream server if it's running.
 */
function stop() {
  if (stream) {
    stream.stop();
    console.log('🔌 RTSP stream stopped.');
    stream = null;
  }
}

// Export the start and stop functions so main.cjs can use them
module.exports = {
  start,
  stop,
};