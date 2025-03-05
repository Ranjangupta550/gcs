// import { useTelemetryStore } from "./telemertyStore";

// const useTelemetry = () => {
//     try {
//         const telemetryData = useTelemetryStore.getState().getTelemetry(); // ✅ Directly access latest telemetry
//         console.log("Telemetry data:", telemetryData.message);
//         if (telemetryData.message) {
//             return telemetryData.message;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error("Failed to get telemetry data:", error);
//         return null;
//     }
// };

// export default useTelemetry;
import { useTelemetryStore } from "./telemetryStore";

const useTelemetry = () => {
    const telemetry = useTelemetryStore((state) => state.telemetry); // ✅ Zustand reactive state
    console.log("Telemetry data:", telemetry?.message || "No telemetry available");

    return telemetry?.message || null;
};

export default useTelemetry;
