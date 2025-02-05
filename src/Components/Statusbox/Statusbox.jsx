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
        <div className="status-box flex flex-col z-10 h-24 bottom-0 w-96  text-white bg-opacity-100 rounded-lg p-2  overflow-y-auto  bg-black ">
            {logMessages.map((msg, index) => (
                <p className='text-yellow-500 font-semibold w-full mb-2' key={index}>{msg}</p>
            ))}
        </div>
    );
};

export default StatusBox;
