import React, { useState, useEffect } from 'react';
import PilotProfileCard from './PilotProfile';
import userPng from '../assets/Svg/user.png'; // Placeholder image  
import { motion } from 'framer-motion';
 function PilotDashboard() {
  const [pilotData, setPilotData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
 

  const handleClick =()=>{
    setShowProfile(!showProfile);
    handleShowProfile()
  }

  const handleShowProfile = async () => {
    // Simulated API call – replace this with actual backend fetch
    const fetchedData = {
      name: "Ranjan Sharma",
      role: "Drone Pilot",
      totalDrones: 5,
      currentMission: "Surveying Field A",
      experience: 3,
      droneId: "DRN-1024-X",
      image: "", // optional image URL
    };
    setPilotData(fetchedData);
  };

  return (
    <div className='flex items-center justify-center'>
      <button
        onClick={handleClick}
        className='bg-white rounded-full shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110'
        style={{ width: '40px', height: '40px' }}
      >
        <img src={userPng} alt="" />
      </button>

      {showProfile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <PilotProfileCard pilotData={pilotData} />
        </motion.div>
      )}
    </div>
  );
}

export default PilotDashboard;


