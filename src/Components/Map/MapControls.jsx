import React, { useState } from "react";
import { FaPlus, FaMinus, FaCompass, FaMap, FaExpand, FaUndo } from "react-icons/fa";

const mapStyles = {
    Streets: "mapbox://styles/mapbox/streets-v11",
    Outdoor: "mapbox://styles/mapbox/outdoors-v11",
    Light: "mapbox://styles/mapbox/light-v10",
    Dark: "mapbox://styles/mapbox/dark-v10",
    Satellite: "mapbox://styles/mapbox/satellite-v9",
    "Satellite Streets": "mapbox://styles/mapbox/satellite-streets-v11",
};

const MapControls = ({ setViewState }) => {
    const [showStyles, setShowStyles] = useState(false);

    return (
        <div className="absolute top-4 right-4 flex flex-col space-y-3">
            {/* Zoom Controls */}
            <button
                className="p-3 bg-black bg-opacity-60 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() => setViewState((prev) => ({ ...prev, zoom: prev.zoom + 1 }))}
            >
                <FaPlus size={18} />
            </button>
            <button
                className="p-3 bg-black bg-opacity-60 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() => setViewState((prev) => ({ ...prev, zoom: prev.zoom - 1 }))}
            >
                <FaMinus size={18} />
            </button>

            {/* Bearing Control + Reset Bearing */}
            <button
                className="p-3 bg-black bg-opacity-60 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() => setViewState((prev) => ({ ...prev, bearing: prev.bearing + 10 }))}
            >
                <FaCompass size={18} />
            </button>
            <button
                className="p-3 bg-black bg-opacity-60 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() => setViewState((prev) => ({ ...prev, bearing: 0 }))}
            >
                <FaUndo size={18} />
            </button>

            {/* 3D/2D Toggle */}
            <button
                className="p-3 bg-black bg-opacity-60 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() =>
                    setViewState((prev) => ({
                        ...prev,
                        pitch: prev.pitch === 0 ? 60 : 0, // Switch between 2D (0) and 3D (60)
                    }))
                }
            >
                <FaExpand size={18} />
            </button>

            {/* Map Style Toggle */}
            <button
                className="p-3 bg-black bg-opacity-60 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() => setShowStyles(!showStyles)}
            >
                <FaMap size={18} />
            </button>

            {/* Map Style Popup */}
            {showStyles && (
                <div className="absolute top-0 right-12 bg-black bg-opacity-80 p-2 rounded-lg shadow-lg text-white">
                    {Object.entries(mapStyles).map(([label, style]) => (
                        <button
                            key={style}
                            className="block px-4 py-1 text-sm hover:bg-gray-800 rounded"
                            onClick={() => {
                                setViewState((prev) => ({ ...prev, mapStyle: style }));
                                setShowStyles(false);
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MapControls;
