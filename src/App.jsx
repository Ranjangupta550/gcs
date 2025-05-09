import { BrowserRouter,HashRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import {Home,MainLayouts,Navigation,NotFound} from "./index";
import { ToastBar,Toaster } from "react-hot-toast";
import { Children } from "react";

function App() {
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);  // Should log: http://localhost:5173

  
  return (
   <HashRouter>
    <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    <Navigation />

   <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />

      </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
   </HashRouter>

  );
}

export default App;
