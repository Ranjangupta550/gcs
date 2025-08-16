import React from 'react';
import  {useState,useEffect} from "react";
import useTelemetry from '../../Store/centralTelemetry';

const AltitudeIndicator = () => {                                                                                                                     
    const telemetry = useTelemetry(); 
    const [altitude, setAltitude] = useState(0); 
    // useEffect(() => {
    //     setAltitude(telemetry?.nav?.altitude || 0);
    // }, [telemetry?.nav?.altitude]);

const getSliderColor = (altitude) => {
    if (altitude <= 10) return '#22c55e'; // green
    if (altitude <= 20) return '#84cc16'; // lime
    if (altitude <= 30) return '#eab308'; // yellow
    if (altitude <= 40) return '#f97316'; // orange
    return '#ef4444'; // red
};
const getSliderBackground = (altitude) => {
    const color = getSliderColor(altitude);
    const percentage = altitude * 2; // 50m max ke liye
    return `linear-gradient(to right, ${color} ${percentage}%, #000 ${percentage}%)`;
};

    return (

        <>
        <div className='flex  flex-col items-center left-44  absolute justify-between h-[440px] w-3 bg-black/50 rounded-lg shadow-lg'>

            <span className='text-red-600  text-sm relative font-bold bottom-6'>50m</span>
           <input type="range" className='altitude-slider
           border-2 border-white/20 bg-transparent appearance-none h-full
              -rotate-90 
               altitude-slider transition-all duration-300 ease-in-out' name="altitude" id="altitude" min="0" max="50" value={altitude}
            readOnly
            style={{ background: getSliderBackground(altitude) }}
            
            />
            <span className="absolute flex items-center justify-center text-white font-extrabold border bg-black/50 right-12 px-2 py-1 rounded-lg text-lg w-20 h-18 transition-all duration-300 ease-in-out"
            style={{ 
                top: altitude >= 50 ? '50px' : `${Math.max(50, 400 - altitude * 8)}px`,
                transitionDuration: '0.3s',
                transitionTimingFunction: 'ease-in-out',

            }}
            >
               {altitude}m
            </span>
        <span className='text-green-600 font-bold relative top-6'>0m</span>
        </div>


       </>
    );
}


export default AltitudeIndicator;