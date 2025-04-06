import { create } from "zustand";
import { armDrone,disarmDrone } from "../api/droneapi";
import {socket} from "../api/api";


export const armStatus=create((set)=>({
    isArmed:false,
    setArmStatus:(status)=>set({isArmed:status}),

    handleArm:async()=>{
        try {
            const response = await armDrone();
            if(response){
                set({isArmed:true});
                console.log("Drone armed successfully!");
                socket.on("disarm_response", (data) => {
                    console.log("Disarm response:", data);
                    if(data.message){
                        set({isArmed:false});
                    }
                    else{
                        console.log("Failed to disarm drone.");
                    }
                    // set({isArmed:false});
                }
                );
            }
            else{
                console.log("Failed to arm drone.");
            }

        } catch (error) {
            console.error("Error while arming:", error);
        }
    },

    handleDisarm:async()=>{
        try {
            const response = await disarmDrone();
            if(response){
                set({isArmed:false});
                console.log("Drone disarmed successfully!");
            }
            else{
                console.log("Failed to disarm drone.");
            }

        } catch (error) {
            console.error("Error while disarming:", error);
        }
    },
    
}))