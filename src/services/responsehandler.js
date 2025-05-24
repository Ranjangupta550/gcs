
import { socket } from "./api";
import {useTelemetryStore,connectionStatus,notify} from "../index";
import { use } from "react";



function responseHandler(){
    socket.on(`connection_response`, (data) => {
        console.log("📩 Server Response for connection:", data);
     try
        {
            if (data.message) {
                console.log("✅ Drone connected successfully!");
                notify("Drone connected successfully!", "success");
                connectionStatus.getState().setConnectionandLoading(true,false);
            
            } else {
                console.log("Failed to connect drone.");
                notify("Failed to connect drone.", "error");
                connectionStatus.getState().setConnectionandLoading(false,false);
            }
        } catch (error) {
            console.error("Error in connection response:", error);
            notify("Error in connection response", "error");
            connectionStatus.getState().setConnectionandLoading(false,false);
        }
    });
    socket.on(`disconnection_response`, (data) => {

        console.log("📩 Server Response for disconnection:", data);
        try
        {
            if (data.message) {
                console.log("✅ Drone disconnected successfully!");
                notify("Drone disconnected successfully!", "success");
                connectionStatus.getState().setConnectionandLoading(false,false);
                useTelemetryStore.getState().setTelemetry(null);
            } else {
                console.log("Failed to disconnect drone.");
                notify("Failed to disconnect drone.", "error");
                connectionStatus.getState().setConnectionandLoading(false,false);
            }
        } catch (error) {
            console.error("Error in disconnection response:", error);
            notify("Error in disconnection response", "error");
            connectionStatus.getState().setConnectionandLoading(false,false);
        }

    });
    socket.on(`ack_response`, (data) => {
        console.log("📩 Server Response for arm:", data);
    });
    socket.on(`monitoring_response`, (data) => {
        console.log("📩 Server Response for disarm:", data);
    });
    socket.on(`arm_response`, (data) => {
        console.log("📩 Server Response for arm:", data);
    });
    socket.on(`disarm_response`, (data) => {
        console.log("📩 Server Response for disarm:", data);
    });
    socket.on(`throttleup_response`, (data) => {
        console.log("📩 Server Response for throttle up:", data);
    });
    socket.on(`throttledown_response`, (data) => {
        console.log("📩 Server Response for throttle down:", data);
    });
    socket.on(`rollright_response`, (data) => {
        console.log("📩 Server Response for roll right:", data);
    });
    socket.on(`rollleft_response`, (data) => {
        console.log("📩 Server Response for roll left:", data);
    });
    socket.on(`pitchforward_response`, (data) => {
        console.log("📩 Server Response for pitch forward:", data);
    });
    socket.on(`pitchbackward_response`, (data) => {
        console.log("📩 Server Response for pitch backward :", data);
    });
    socket.on(`yawclock_response`, (data) => {
        console.log("📩 Server Response for yaw clock:", data);
    });
    socket.on(`yawanticlock_response`, (data) => {
        console.log("📩 Server Response for yaw anticlockwise:", data);
    });
    socket.on(`setalt_response`, (data) => {
        console.log("📩 Server Response for set altitude:", data);
    });
    socket.on(`land_response`, (data) => {
        console.log("📩 Server Response for land:", data);
    });
    socket.on(`camera`, (data) => {
        console.log("📩 Server Response for camera:", data);
    });
    socket.on(`telemetry_response`, (data) => {
        console.log("📩 Server Response for telemetry:", data); 

        useTelemetryStore.getState().setTelemetry(data);
     
    });
    socket.on(`mavmsg_response`, (data) => {    
        console.log("📩 Server Response for get mavmessage:", data);
    });
    socket.on(`start_scan_response`, (data) => {
        console.log("📩 Server Response for start scan:", data);
    });
}

export default responseHandler;