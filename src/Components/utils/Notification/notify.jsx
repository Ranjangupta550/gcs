import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/animation/sucessAnimation.json";
import errorAnimation from "../../../assets/animation/errorAnimation.json"; // Import your error animation here
import infoAnimation from "../../../assets/animation/infoAnimation.json"; // Import your info animation here  


const playsound=(type)=>{
  const audio = new Audio(`public/${type}.mp3`); // Adjust the path as necessary
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
}
// const showSystemNotification = (title, body,) => {
//   if (Notification.permission === "granted") {
//     new Notification(title, {
//       body,
//     });
//   }
// };

const notify = (message, type) => {
  const baseOptions = {
    duration: 3000,
    position: "top-center",
    style: {
      borderRadius: "10px",
      padding: "16px",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#000",
    },
  };

  switch (type) {
    case "success":
      playsound("success"); // Play success sound
      // showSystemNotification("Success", message); // Show system notification
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-lg border border-green-300`}
        >
          <Lottie
            animationData={successAnimation}
            loop={false}
            autoplay
            style={{ width: 40, height: 40 }}
          />
          <span className="text-green-700 font-semibold">{message}</span>
        </div>
      ), {
        duration: baseOptions.duration,
        position: baseOptions.position,
      });
      break;

    case "error":
      playsound("error"); // Play error sound
      // showSystemNotification("Error", message); // Show system notification
     toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-lg border border-red-300`}
        >
          <Lottie
            animationData={errorAnimation}
            loop={false}
            autoplay
            style={{ width: 40, height: 40 }}
          />
          <span className="text-red-700 font-semibold">{message}</span>
        </div>
      ), {
        duration: baseOptions.duration,
        position: baseOptions.position,
      });
      break;

    case "info":
      playsound("info"); // Play info sound
      // showSystemNotification("Info", message);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center gap-3 w-96 bg-white text-wrap px-4 py-3 rounded-xl shadow-lg border border-blue-300`}
        >
          <Lottie
            animationData={infoAnimation}
            loop={false}
            autoplay
            style={{ width: 50, height: 50 }}
          />
          <span className="text-blue-700 font-semibold">{message}</span>
        </div>
      ), {
        duration: 6000,
        position:"bottom-right",
        style: {
          ...baseOptions.style,
          background: "#f0f4ff",
          color: "#1e3a8a",
        },
      });
      break;

    case "warning":
      playsound("warning"); // Play warning sound
      // showSystemNotification("Warning", message);
      toast(message, {
        ...baseOptions,
        icon: "⚠️",
        style: {
          background: "#ff9800",
          color: "#fff",
        },
      });
      break;

    default:
      toast(message, baseOptions);
  }
};

export default notify;
