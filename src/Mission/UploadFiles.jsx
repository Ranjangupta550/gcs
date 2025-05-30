import React, { useState } from "react";
import notify from "../Components/UI/notify";
import { sendCommandWithPayload } from "../services/api";

const UploadFiles = () => {
  const [fileData, setFileData] = useState(null);
  const chooseFile = async () => {
    try {
      const selected = await window.api.selectMissionFile();
     if(selected?.name&&selected?.content){
        setFileData(selected);
        notify("File selected successfully!", "success");
      }
    } catch (error) {
      notify("File selection failed!", "error");
      console.error("File selection failed:", error);
    }
  };
const handleUpload = async () => {
    if (!fileData) return;

    const uploadPromise = sendCommandWithPayload("uploadMission", {
       name: fileData.name,
       content: fileData.content
    });

    notify.promise(uploadPromise, {
        pending: "Uploading file...",
        success: "File uploaded successfully!",
        error: "File upload failed!",
    });

    try {
        const response = await uploadPromise;
        console.log("File upload response:", response);
        if (response.success) {
            notify("File uploaded successfully!", "success");
        } else {
            notify("File upload failed!", "error");
        }
    } catch (error) {
        console.error("File upload failed:", error);
    }

    window.api.send("close-upload-window");
};

  const handleCancel = () => {
    // Ask main process to close the window
    window.api.send("close-upload-window");
  };

  return (
    <div
      style={{
        padding: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <button
        onClick={chooseFile}
        style={{ marginBottom: "10px", padding: "6px 12px" }}
      >
        Choose File
      </button>

      {fileData && (
        <p
          style={{
            fontSize: "12px",
            maxWidth: "90%",
            textAlign: "center",
            wordBreak: "break-all",
            marginBottom: "10px",
          }}
        >
          {fileData.name}
        </p>
      )}

      <div>
        <button
          onClick={handleUpload}
          disabled={!fileData}
          style={{
            padding: "6px 12px",
            marginRight: "10px",
            backgroundColor: fileData ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: fileData ? "pointer" : "default",
          }}
        >
          Upload
        </button>

        <button
          onClick={handleCancel}
          style={{
            padding: "6px 12px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadFiles;
