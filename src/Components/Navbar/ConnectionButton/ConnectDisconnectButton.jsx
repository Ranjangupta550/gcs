import React from "react";
import { useState,useEffect } from "react";
const ConnectionStatus = () => {
    const [connection, setConnection] = useState("Disconnected");
    const [connectionStatus, setConnectionStatus] = useState(false);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setConnectionStatus((prev) => !prev);
            setConnection((prev) => (prev === "Connected" ? "Disconnected" : "Connected"));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return (
       
            <button
                className="flex items-center space-x-1 rounded-md border transition-colors duration-300 h-full p-2 font-bold w-32 justify-center"
                style={{
                    backgroundColor: connectionStatus ? "#00FF00" : "#FF0000",
                    color: connectionStatus ? "#000000" : "#FFFFFF"
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = connectionStatus ? "#00CC00" : "#CC0000";
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = connectionStatus ? "#00FF00" : "#FF0000";
                }}
                onMouseDown={(e) => {
                    e.target.style.backgroundColor = connectionStatus ? "#009900" : "#990000";
                }}
                onMouseUp={(e) => {
                    e.target.style.backgroundColor = connectionStatus ? "#00CC00" : "#CC0000";
                }}
            >
                {connection}
            </button>
      
    );
}
export default ConnectionStatus;
