
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ControlButton from '../Components/Common/ControlButton';

const socket = io('http://192.168.29.13:5000'); // Adjust the URL as needed

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on("connect", (message) => {
            // console.log("Connected to server:", message);
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages, message]; // Create a new array
              console.log("Message received:", updatedMessages); // Log the new state
              return updatedMessages; // ✅ Return the new array to update state
            });
          });
          

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket.send(input);
        setInput('');
    };
    const routeConect=()=>{
        // socket.emit('connect', 'connect');
        socket.send('connect');
    }

    return (
        <div className='border-2 flex absolute top-48 left-7'>   
            <div>
              
                    <div>{messages}</div>
            
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>

            <button
                onClick={() => {
                    console.log('connect');
                    routeConect
                }}
             className='flex ml-3 bg-blue-600'>Connect</button>
        </div>
    );
};

export default ChatComponent;