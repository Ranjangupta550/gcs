import {
  BrowserRouter,
  HashRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import { FlightControlPannel, Home, MainLayouts, Navigation, NotFound, VideoStream,MissionStats, CameraFeed,Splash,LoginForm } from "./index";
import { ToastBar, Toaster } from "react-hot-toast";
import { Children, useEffect } from "react";
import { initServices } from "./services/server";
function App() {

  useEffect(() => {
    // Initialize services when the app starts
    initServices();
  }, []);
 
  return (
    <HashRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Navigation />

<Routes>
  <Route path="/" element={<MainLayouts />}>
    <Route index element={<Home />} />
    <Route path="home" element={<Home />} />
    <Route path="flightcontrol" element={<FlightControlPannel />} />
  </Route>

  {/* Outside the MainLayouts (no sidebar, no navbar, clean view) */}
  <Route path="/mission-stats" element={<MissionStats />} />
  <Route path="/CameraFeed" element={<CameraFeed />} />
  <Route path="/Splash" element={<Splash />} />
  <Route path ="/Login" element={<LoginForm />} />
  <Route path="*" element={<NotFound />} />

</Routes>
    </HashRouter>
  );
}

export default App;
