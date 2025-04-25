import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/Home";
import VideoStream from "./Components/videoStream/VideoStream"; // 
import { Toaster } from "react-hot-toast";
// Import\ the Video Stream page
import UploadMission from "./Components/utils/UploadFiles"
function App() {
  // if (Notification.permission !== "granted") {
  //   Notification.requestPermission();
  // }
  return (
    <Router>
      <Toaster
      /> {/* Add Toaster component for notifications */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/video" element={<VideoStream />} /> {/* Add the VideoStream page */}
        <Route path="/upload" element={<UploadMission />} /> {/* Add the UploadMission page */}
      
      </Routes>
    </Router>
  );
}

export default App;
