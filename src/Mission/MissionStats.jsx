import React, { useState, useEffect } from "react";
import { use } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from "recharts";

const generateTelemetry = (durationSec = 300) => {
  const telemetry = [];
  let altitude = 0;
  let speed = 0;
  let battery = 100;
  for (let time = 0; time <= durationSec; time++) {
    // Example logic: takeoff, cruise, descend
    if (time < 30) {
      altitude = time * 2; // takeoff
      speed = Math.min(5, time * 0.2);
    } else if (time < 200) {
      altitude = 60 + Math.sin(time / 20) * 10; // cruise with small variation
      speed = 8 + Math.sin(time / 30) * 2;
    } else if (time < 270) {
      altitude = Math.max(0, 60 - (time - 200) * 1); // descend
      speed = Math.max(2, 8 - (time - 200) * 0.1);
    } else {
      altitude = 0;
      speed = 0;
    }
    battery = Math.max(0, 100 - time * 0.3); // simple battery drain
    telemetry.push({
      time,
      altitude: Math.round(altitude),
      speed: Math.round(speed * 10) / 10,
      battery: Math.round(battery),
    });
  }
  return telemetry;
};

const dummyMissions = [
  {
    id: "mission_001",
    name: "Survey Field A",
    telemetry: generateTelemetry(3600),
  },
  {
    id: "mission_002",
    name: "Disaster Scan Area B",
    telemetry: generateTelemetry(300),
  },
];

const MissionGraph = () => {
  const [selectedMission, setSelectedMission] = useState(dummyMissions[0]);

  useEffect(() => {
    const mission = dummyMissions.find((m) => m.id === selectedMission.id);
    setSelectedMission(mission);
  }, [selectedMission.id]);

  const handleSelect = (e) => {
    const missionId = e.target.value;
    const mission = dummyMissions.find((m) => m.id === missionId);
    setSelectedMission(mission);
  };

  return (
    <div className="p-6 w-screen h-screen border-2  flex flex-col border-borderColor rounded-lg bg-backgroundPrimary ">
      <h2 className="text-2xl text-white text-opacity-85 font-semibold mb-4">
        📊 Mission Telemetry Graph
      </h2>

      <select
        onChange={handleSelect}
        className="mb-4 px-4 py-2 border rounded bg-white text-black"
      >
        {dummyMissions.map((mission) => (
          <option key={mission.id} value={mission.id}>
            {mission.name}
          </option>
        ))}
      </select>
      <div className="flex items-center justify-center border-2 border-white rounded-lg w-3/5 h-[60%] p-2 ">

      <LineChart width={900} height={400}  data={selectedMission?.telemetry||[]}>
        <CartesianGrid strokeDasharray="1 1 "
          vertical={false}
          horizontal={true}
          stroke="#fff"
          strokeWidth={1}
          fill="#000"
         />
        <XAxis
          dataKey="time"
            // tick={{ fill: "#fff" }}
          label={{
              value: "Time (sec)",
              position: "center",
              dy: 15,
            }}
            interval={5}
            />
        <YAxis
          yAxisId="left"
          orientation="left"
          label={{ value: "Altitude (m)", angle: -90, position: "center", dx: -15 }}
          />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
              value: "Speed / Battery",
              angle: -90,
              position: "center",
              dx: 15,
            }}
            />
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="line"
          iconSize={10}
          wrapperStyle={{ paddingTop: "10px" }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="altitude"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="speed"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={false}
            />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="battery"
          stroke="#ff4d4f"
          strokeWidth={2}
          dot={false}
          />
          <Brush
          dataKey="time"
          height={30}
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
          startIndex={0}
          endIndex={selectedMission?.telemetry.length - 1}
          travellerWidth={20}
          />

      </LineChart>
    </div>
    </div>
  );
};

export default MissionGraph;
