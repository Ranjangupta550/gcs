import React from "react";

function MissionStatus({ status }) {
  return (
    <div className="absolute top-5 right-5">
      <div className="flex items-center bg-white p-3 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mr-3">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-gray-700 text-sm font-semibold">
          {status}
        </div>
      </div>
    </div>
  );
}

export default MissionStatus;