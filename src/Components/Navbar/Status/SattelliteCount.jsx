import React, { useEffect, useState } from 'react';
import SatelliteSvg from "../../../assets/Svg/Satellight.svg";

function SatelliteCount({ count }) {
    const [NumberSatellite, setCount] = useState(0);

    useEffect(() => {
        setCount(count);
    }, [count]);

    return (
        <div className="flex relative  text-gray-500">
            <div className="flex-col flex items-center">
                <img src={SatelliteSvg} className='w-8' alt="" />
                <span className="text-[10px]">Satellite</span>
            </div>
            <p className="text-gray-500 font-bold">{NumberSatellite}</p>
           
        </div>
    );
}

export default SatelliteCount;