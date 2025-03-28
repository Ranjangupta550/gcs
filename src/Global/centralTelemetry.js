import { useTelemetryStore } from "./telemetryStore";

const useTelemetry = () => {
    const telemetry = useTelemetryStore((state) => state.telemetry); // ✅ Zustand reactive state
    // console.log("Telemetry data:", telemetry?.message || "No telemetry available");

    return telemetry?.message || null;
};

export default useTelemetry;
