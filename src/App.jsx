import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/Home";
import VideoStream from "./Components/videoStream/VideoStream"; // Import the Video Stream page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/video" element={<VideoStream />} /> {/* Add the VideoStream page */}
      </Routes>
    </Router>
  );
}

export default App;
