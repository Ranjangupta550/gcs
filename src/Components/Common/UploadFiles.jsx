import React, { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import Notification from "../../utils/Notification";
import { socket } from "../../api/api"; // Ensure this is the correct import path for socket

const FileUpload = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [notification, setNotification] = useState(null);
    const fileReaderRef = useRef(null); // Store FileReader instance

    useEffect(() => {
        const handleUploadResponse = (response) => {
            setIsUploading(false);
            console.log("Server response:", response);

            if (response?.message) {
                setNotification({
                    title: "Mission Uploaded",
                    message: "The mission file has been uploaded successfully.",
                    type: "success",
                });
                console.log("Mission uploaded successfully.");
            } else {
                setNotification({
                    title: "Upload Failed",
                    message: "Failed to upload the mission file.",
                    type: "error",
                });
                console.log("Failed to upload the mission file.");
            }

            resetUpload();
        };

        socket.on("upload_response", handleUploadResponse);

        return () => {
            socket.off("upload_response", handleUploadResponse);
        };
    }, []);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFile(event.target.files[0]);
            console.log("File selected:", event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) {
            setNotification({ title: "Error", message: "No file selected!", type: "error" });
            console.log("No file selected!");
            return;
        }

        if (!socket) {
            setNotification({ title: "Error", message: "WebSocket connection not established!", type: "error" });
            console.log("WebSocket connection not established!");
            return;
        }

        setIsUploading(true);
        console.log("Uploading file:", file.name);

        const reader = new FileReader();
        fileReaderRef.current = reader; // Store reader in ref

        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const fileData = new Uint8Array(arrayBuffer); // Convert to Uint8Array

            console.log("File data read (buffer format):", fileData);

            socket.emit("upload", { filename: file.name, data: fileData });

            setNotification({ title: "Uploading", message: "Mission file is uploading...", type: "info" });
        };

        reader.onerror = () => {
            setNotification({ title: "Error", message: "Failed to read file.", type: "error" });
            setIsUploading(false);
            console.log("Error reading file.");
        };

        reader.readAsArrayBuffer(file); // Read as binary buffer
    };

    const resetUpload = () => {
        if (fileReaderRef.current) {
            fileReaderRef.current.abort(); // Abort file reading
        }
        setIsUploading(false);
        setFile(null);
        setIsOpen(false);
        console.log("Upload process canceled.");
    };

    return (
        <div className="flex flex-col items-center">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setIsOpen(true)}
            >
                Upload Mission
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-lg font-semibold mb-4">Select a Mission File</h2>

                        <input
                            type="file"
                            accept=".waypoints"
                            onChange={handleFileChange}
                            className="mb-4 border p-2 w-full"
                        />

                        <div className="flex justify-between">
                            <button
                                className={`px-4 py-2 rounded-md text-white ${
                                    file ? "bg-green-500 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                                }`}
                                onClick={handleUpload}
                                disabled={!file || isUploading}
                            >
                                {isUploading ? <Loader /> : "Upload"}
                            </button>

                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                onClick={resetUpload}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {notification && <Notification title={notification.title} message={notification.message} type={notification.type} />}
        </div>
    );
};

export default FileUpload;
