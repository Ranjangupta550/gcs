// StatusBox.jsx
import React from 'react';

const StatusBox = ({ logMessages }) => {
    return (
        <div className="status-box">
            {logMessages.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
    );
};

export default StatusBox;
