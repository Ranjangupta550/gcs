// import React, { useState } from "react";
// import connectionStatus from "../../../Global/connectionStatus.js";
// import Loader from "../../Common/Loader.jsx";
// import Notification from "../../../utils/Notification.jsx";

// const ConnectionButton = () => {
//     const { isConnected, connect, disconnect } = connectionStatus();
//     const [isLoading, setIsLoading] = useState(false);
//     const [notification, setNotification] = useState(null);

//     const handleClick = async () => {
//         setIsLoading(true);
//         let response = isConnected ? await disconnect() : await connect();

      
//         if (response.message) {
//             setNotification({
//                 title: isConnected ? "Drone Disconnected" : "Drone Connected",
//                 message: isConnected
//                     ? "The drone has been successfully disconnected."
//                     : "The drone has been successfully connected.",
//                 type: isConnected ? "disconnect" : "success",
//             });
//         } else {
//             setNotification({
//                 title: "Connection Failed",
//                 message: "Unable to connect/disconnect the drone.",
//                 type: "error",
//             });
//         }


//         setIsLoading(false);
//     };

//     return (
//         <>
//             <button
//                 className="flex items-center space-x-1 rounded-md border transition-colors duration-300 h-full p-2 font-bold w-32 justify-center"
//                 style={{
//                     backgroundColor: isConnected ? "#FF0000" : "#00FF00",
//                     color: "#FFFFFF",
//                 }}
//                 onClick={handleClick}
//                 disabled={isLoading}
//             >
//                 {isLoading ? <Loader /> : isConnected ? "Disconnect" : "Connect"}
//             </button>

//             {notification && (
//                 <Notification
//                     title={notification.title}
//                     message={notification.message}
//                     type={notification.type}
//                     onClose={() => setNotification(null)}
//                 />
//             )}
//         </>
//     );
// };

// export default ConnectionButton;
import React, { useState } from "react";
import connectionStatus from "../../../Global/connectionStatus.js";
import Loader from "../../Common/Loader.jsx";
import Notification from "../../../utils/Notification.jsx";

const ConnectionButton = () => {
    const { isConnected, connect, disconnect } = connectionStatus();
    const monitor = connectionStatus.getState().monitor;  // Access monitor correctly

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleClick = async () => {
        setIsLoading(true);
        let response = isConnected ? await disconnect() : await connect();

        if (response.message) {
            setNotification({
                title: isConnected ? "Drone Disconnected" : "Drone Connected",
                message: isConnected
                    ? "The drone has been successfully disconnected."
                    : "The drone has been successfully connected.",
                type: isConnected ? "disconnect" : "success",
            });

            if (!isConnected) {  // Only start monitoring after connecting
                monitorDrone();
            }
        } else {
            setNotification({
                title: "Connection Failed",
                message: "Unable to connect/disconnect the drone.",
                type: "error",
            });
        }

        setIsLoading(false);
    };

    const monitorDrone = async () => {
        let response = await monitor();
        console.log("Monitoring response recived: ", response);
        if (response) {
            setNotification({
                title: "Drone Disconnected",
                message: "The drone disconnected unexpectedly.",
                type: "error",
            });
        }
    };

    return (
        <>
            <button
                className="flex items-center space-x-1 rounded-md border transition-colors duration-300 h-full p-2 font-bold w-32 justify-center"
                style={{
                    backgroundColor: isConnected ? "#FF0000" : "#00FF00",
                    color: "#FFFFFF",
                }}
                onClick={handleClick}
                disabled={isLoading}
            >
                {isLoading ? <Loader /> : isConnected ? "Disconnect" : "Connect"}
            </button>

            {notification && (
                <Notification
                    title={notification.title}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </>
    );
};

export default ConnectionButton;
