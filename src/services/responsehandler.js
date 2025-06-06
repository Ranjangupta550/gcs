
import { socket } from "./api";
import {useTelemetryStore,connectionStatus,notify, clearTimeoutByKey,armStatus,useMavmessageStore} from "../index";
import { use } from "react";



function responseHandler(){
    socket.on(`connection_response`, (data) => {
        clearTimeoutByKey("connection");
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
        clearTimeoutByKey("disconnection");
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
        console.log("📩 Server Response for monitoring:", data);
        try{
            if(data?.message?.connected===false){
                connectionStatus.getState().setConnectionandLoading(false,false);
                armStatus.getState().setArmandLoading(false,false);
                notify("Drone disconnected unexpectedly", "error");
                // connectionStatus.getState().setConnectionandLoading(false,false);
                useTelemetryStore.getState().setTelemetry(null);
            }
            else if (data?.message?.connected===true&&data?.message?.arm===false){  
               armStatus.getState().setArmandLoading(false,false);
               notify("Drone disarmed unexpectedly", "error");
            }
        } catch (error) {
            console.error("Error in monitoring response:", error);
            notify("Error in monitoring response", "error");
        }
    });
    socket.on(`arm_response`, (data) => {
        clearTimeoutByKey("arm");
        console.log("📩 Server Response for arm:", data);
        try {
            if (data.message) {
                console.log("✅ Drone armed successfully!");
                notify("Drone armed successfully!", "success");
                armStatus.getState().setArmandLoading(true,false);
            } else {
                console.log("Failed to arm drone.");
                notify("Failed to arm drone.", "error");
                armStatus.getState().setArmandLoading(false,false);
            }
        } catch (error) {
            console.error("Error in arm response:", error);
            notify("Error in arm response", "error");
            armStatus.getState().setArmandLoading(false,false);
        }
    });
    socket.on(`disarm_response`, (data) => {
        clearTimeoutByKey("disarm");
        console.log("📩 Server Response for disarm:", data);
        try {
            if (data.message) {
                console.log("✅ Drone disarmed successfully!");
                notify("Drone disarmed successfully!", "success");
                armStatus.getState().setArmandLoading(false,false);
            } else {
                console.log("Failed to disarm drone.");
                notify("Failed to disarm drone.", "error");
                armStatus.getState().setArmandLoading(false,false);
            }
        } catch (error) {
            console.error("Error in disarm response:", error);
            notify("Error in disarm response", "error");
            armStatus.getState().setArmandLoading(false,false);
        }
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
        // console.log("📩 Server Response for telemetry:", data); 
        useTelemetryStore.getState().setTelemetry(data);
     
    });
    socket.on(`mavmsg_response`, (data) => {    
        // console.log("📩 Server Response for get mavmessage:", data);
        try {
            if (data?.message) {
                useMavmessageStore.getState().addMavmessage(data.message);
            } else {
                console.log("No MAVLink message received.");
            }
        } catch (error) {
            console.error("Error in mavmsg response:", error);
            notify("Error in mavmsg response", "error");
        }
    });
    socket.on(`start_scan_response`, (data) => {
        console.log("📩 Server Response for start scan:", data);
    });

}

export default responseHandler;