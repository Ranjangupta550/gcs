import { create } from "zustand";
import { armDrone,disarmDrone } from "../services/emitHandler";
import {socket} from "../services/api";


 const armStatus=create((set)=>({
    isArmed:false,
    isLoading:false,
    setArmStatus:(status)=>set({isArmed:status}),
    setArmandLoading:(status,loading)=>set({isArmed:status,isLoading:loading}),

    arm:async()=>{
        set({isLoading:true});
        await armDrone();  
    },
    disArm:async()=>{
        set({isLoading:true});
        await disarmDrone();
    },

}));

export default armStatus;