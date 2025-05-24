// StatusBox.jsx
import React from 'react';
import './StatusBox.css';

const demoMessages = [
    'Drone is taking off',
    'Drone is moving to the destination',
    'Drone is landing',
    'Drone is landed',
];

const StatusBox = ({ logMessages = demoMessages }) => {
    return (
        <div className="status-box flex flex-col z-10 max-h-44 bottom-0 w-full border-4 border-borderColor  text-white bg-opacity-100 rounded-lg p-2  overflow-y-auto  bg-backgroundSecondary ">
            {logMessages.map((msg, index) => (


                <div className='flex items-center justify-evenly my-1  border-b border-white border-opacity-20' key={index}>
                    <span className=' w-8 h-full flex'>{index+1}.</span>
                     <p className='text-white  text-opacity-70 h-full  border-white font-semibold w-full '>  {msg}</p>
                </div>
        
               
            ))}
        </div>
    );
};

export default StatusBox;
