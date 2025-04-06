import React, { useState } from 'react';
import { sendAltitude } from '../../api/droneapi';


const Text = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async (input) => {
        try {
            console.log("Sending altitude:", input);
            const response = await sendAltitude(input);
            if (response) {
                console.log("Altitude sent successfully!");
                setMessages((prevMessages) => [...prevMessages, input]);
                setInput(''); // Clear the input field after sending the message
            } else {
                console.log("Failed to send altitude.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleConnect = () => {
        console.log('Connect button clicked');
        // Add your connection logic here
        sendMessage(input);

    };

    return (
        <div className='border-2 flex absolute top-48 left-7'>
            <div>
                <div>
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>

            <button
                onClick={handleConnect}
                className='flex ml-3 bg-blue-600'
            >
                Connect
            </button>
        </div>
    );
};

export default Text;