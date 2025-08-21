// import { time } from "systeminformation";

const timeout = new Map();

export function startTimeout (key,duration,onTimeout){
    clearTimeoutByKey(key); //eg connect,arm
    const timeoutId = setTimeout(() => {
        timeout.delete(key);
        onTimeout();
    }, duration);

    timeout.set(key,timeoutId);
}

export function clearTimeoutByKey(key){
    const timeoutId = timeout.get(key);
    if(timeoutId){
        clearTimeout(timeoutId);
        timeout.delete(key)
    }
}