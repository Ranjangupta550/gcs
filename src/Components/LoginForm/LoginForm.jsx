import React from "react";
import { useState } from "react";
import { Button, notify } from "../../index"; // Adjust the import path as necessary
import icons from "../../assets/icons"; // Adjust the import path as necessary


function LoginForm() {
  const defaultCredentials = {
    username: "sidak",
    email: "sidak@example.com",
    password: "sidak@123",
  };
  const [isLogin, setIsLogin] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
   const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleEyeToggle = () => {
    setEyeOpen(!eyeOpen);
    if (eyeOpen) {
      document.getElementById("password").type = "password"; // Hide password
    } else {
      document.getElementById("password").type = "text"; // Show password
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the login logic, like sending the credentials to your server
    console.log("Form submitted with data:", formdata);
    if(
      formdata.username === defaultCredentials.username &&
      formdata.password === defaultCredentials.password
    ) {
      console.log("Login successful!");
      setIsLogin(true);
      setTimeout(() => {
        window.api.send("login-success", isLogin);
      }, 1500);
      notify("Login successful!", "success");
    } else {
      console.log("Login failed. Please check your credentials.");
      notify("Login failed. Please check your credentials.", "error");
    }
  };

  return (
  <div className="login-form w-screen h-screen bg-black overflow-hidden relative flex items-center  ">

    {/* 🌐 Background Image */}
      <img
        src={icons.sidak}
        alt="Globe"
        className=" top-0 z-10 right-0 absolute object-cover w-28  drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      />


    {/* 🔁 Background Video */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute top-0 left-32 w-full h-full object-cover z-0"
    >
      <source src="src/assets/globe.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>


      <div className="absolute right-0 top-1/ items-end   flex flex-col  justify-end ">

   
       <h1 className="welcome-text" style={{ fontSize: '1.2rem', marginRight: '20px' }}>
            Welcome to Sidak Ground control Software
          </h1>
          <p className="tagline-hindi text-yellow-500 right-0 relative" style={{ fontSize: '1rem', marginRight: '20px' }}>
            भारत की सुरक्षा, हमारी प्राथमिकता
          </p>
          {/* <p className="tagline-english" style={{  fontSize: '1rem',   marginRight: '20px' }}>
            "Bharat ki Suraksha, Hamari Prathmikta"
          </p> */}
      </div>
    

    {/* 🔒 Login Form */}
    <form
      onSubmit={handleSubmit}
      className="relative z-10  left-0 backdrop-blur-md p-6 rounded-xl  flex flex-col gap-3 text-white"
    >
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={formdata.username}
        onChange={(e) =>
          setFormdata({ ...formdata, username: e.target.value })
        }
        className="w-full p-1 rounded-md border border-opacity-5 border-white text-white bg-opacity-10 bg-white onactive:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition duration-300 ease-in-out "
        required
      />

      {/* <input
        type="email"
        placeholder="Email"
        value={formdata.email}
        onChange={(e) =>
          setFormdata({ ...formdata, email: e.target.value })
        }
        className="w-full p-1 rounded-md border border-gray-300 text-black"
        required
      /> */}

      <div className="relative w-full">
        <input
          id="password"
          type={eyeOpen ? "text" : "password"}
          placeholder="Password"
          value={formdata.password}
          onChange={(e) =>
            setFormdata({ ...formdata, password: e.target.value })
          }
          className="w-full p-1 pr-10 rounded-md border border-opacity-5 border-white text-white bg-opacity-10 bg-white onactive:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition duration-300 ease-in-out "
          required
        />
        <div
          id="eye"
          onClick={handleEyeToggle}
          className="absolute top-1.5 right-3 cursor-pointer"
        >
          <img
            src={eyeOpen ? icons.openEye : icons.closeEye}
            alt="Toggle Eye"
            className="w-5 h-5"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-1">
          <input type="checkbox" className="w-3 h-3" />
          Remember Me
        </label>
        {/* <div className="text-blue-400 cursor-pointer hover:underline">
          Forgot Password?
        </div> */}
      </div>

      <Button
        type="submit"
        className="w-full bg-black bg-opacity-100 text-white p-1 rounded-md hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out"
      >
        Login
      </Button>
    </form>
  </div>
);

}
export default LoginForm;
