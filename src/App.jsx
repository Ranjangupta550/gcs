import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home,MainLayouts} from "./index";
import { ToastBar,Toaster } from "react-hot-toast";
import { Children } from "react";
function App() {

  return (
   <Router>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />  
    
    <Routes>
      <Route path="/" element={<MainLayouts />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/stats" element={<Stats />} /> */}
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}

    </Routes>
    
   </Router>
  );
}

export default App;
