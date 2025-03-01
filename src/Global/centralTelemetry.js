import useTelemetryStore from "./telemertyStore";
const useTelemetry = () => {
    try {
        const telemetryData = useTelemetryStore.getState().getTelemetry(); // ✅ Directly access latest telemetry
        console.log("Telemetry data:", telemetryData);
        return telemetryData;
    } catch (error) {
        console.error("Failed to get telemetry data:", error);
        return null;
    }
};

export default useTelemetry;
