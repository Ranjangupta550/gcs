import {useTelemetryStore} from '../index';

const useTelemetry = () => {
    const telemetry = useTelemetryStore((state) => state.telemetry); // ✅ Zustand reactive state
    return telemetry?.message || null;
};

export default useTelemetry;
