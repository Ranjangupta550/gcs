import React from 'react';
import './statusbox.css';
import {useMavmessageStore} from '../../index'; // Make sure this path is correct

const StatusBox = () => {
    const messages = useMavmessageStore((state) => state.mavmessages);

    return (
        <div className="status-box relative h-48 flex flex-col z-10 w-full border-2 border-borderColor text-white bg-opacity-100 rounded-lg overflow-y-auto  bg-backgroundSecondary">
            <h5 className='text-lg text-center relative top-0   text-white text-opacity-85 mb-2'>Status Messages</h5>
            {messages.map((msg, index) => (
                <div className='flex items-center justify-evenly my-1 border-b border-white border-opacity-20' key={index}>
                    <div className='text-white text-opacity-70 font-semibold w-full'>
                        <p className='text-sm'>{msg.message}</p>
                        <div className="flex justify-between text-xs opacity-60">
                            <span>{msg.severity}</span>
                            <span>{msg.received_at}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatusBox;
