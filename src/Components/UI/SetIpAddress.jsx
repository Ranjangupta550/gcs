import React, { useState } from "react";
import { Button, config } from "../../index";
export default function SetIpAddress() {
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState("");

    const validate = () => {
        // Simple IP and port validation
        const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
        const portNum = Number(port);
        if (!ipRegex.test(ip)) {
            setError("Invalid IP address.");
            return false;
        }
        if (!port || isNaN(portNum) || portNum < 1 || portNum > 65535) {
            setError("Invalid port.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSetIp = () => {
        if (validate()) {
            config.setIpAddrress(ip, port);
            window.location.reload();
            setShowPopup(false);
        }
    };

    return (
        <>
            <Button
                className=" flex items-center gap-1 justify-center rounded-md w-28  cursor-pointer text-[10px]
        transition-all duration-300 bg-[#1E1E1E] p-1 h-[40px]
        hover:bg-[#2D2D2D] text-white border border-gray-300 border-opacity-65 group relative "
                onClick={() => setShowPopup(true)}
            >
                Set IP Address
            </Button>
            {showPopup && (
                <div className="flex flex-col absolute top-14 right-72 items-center justify-center p-4 bg-[#1E1E1E] text-black rounded-lg border z-50">
                    <input
                        type="text"

                        placeholder="eg 192.168.1.1"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        className="mb-2 px-2 py-1 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Port 5000"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                        className="mb-2 px-2 py-1 rounded"
                    />
                    {error && (
                        <div className="text-red-600 mb-2">{error}</div>
                    )}
                    <div className="flex gap-2">
                        <Button
                            onClick={handleSetIp}
                            className=" bg-red-500  text-white rounded"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => setShowPopup(false)}
                            className="px-4 py-1 bg-gray-400 text-black rounded"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </>
    )

}