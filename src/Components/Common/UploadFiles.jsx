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
    const fileInputRef = useRef(null);

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
            } else {
                setNotification({
                    title: "Upload Failed",
                    message: "Failed to upload the mission file.",
                    type: "error",
                });
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
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            console.log("File selected:", selectedFile);
        }
    };

    const handleUpload = () => {
        if (!file) {
            setNotification({ title: "Error", message: "No file selected!", type: "error" });
            return;
        }

        if (!socket) {
            setNotification({ title: "Error", message: "WebSocket connection not established!", type: "error" });
            return;
        }

        setIsUploading(true);
        console.log("Uploading file:", file.name);

        const reader = new FileReader();
        fileReaderRef.current = reader;

        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const fileData = new Uint8Array(arrayBuffer);

            socket.emit("upload", { filename: file.name, data: fileData });

            setNotification({ title: "Uploading", message: "Mission file is uploading...", type: "info" });
        };

        reader.onerror = () => {
            setNotification({ title: "Error", message: "Failed to read file.", type: "error" });
            setIsUploading(false);
        };

        reader.readAsArrayBuffer(file);
    };

    const resetUpload = () => {
        if (fileReaderRef.current) {
            fileReaderRef.current.abort();
        }

        setFile(null);
        setIsUploading(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Properly reset file input
        }

        setTimeout(() => {
            setIsOpen(false);
            setNotification(null); // Clear notification after closing
        }, 100);
    };

    const openModal = () => {
        setFile(null); // Ensure file is reset before opening
        setIsUploading(false);
        setIsOpen(true);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={openModal}
            >
                Upload Mission
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-lg font-semibold mb-4">Select a Mission File</h2>

                        <input
                            type="file"
                            ref={fileInputRef}
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
