import React, { useState, useEffect } from 'react';
import SidakLogo from '../../assets/Svg/sidak.png';
import CamoBg from '../../assets/Svg/camoBg.png';
import './Splash.css';

const Splash = () => {
  // const CamoBg = 'https://img.freepik.com/free-vector/seamless-camouflage-pattern-green-brown-colors_1284-47391.jpg?semt=ais_hybrid&w=740';

  // State to manage the animation phase
  const [phase, setPhase] = useState('scanning'); // scanning -> targeting -> locked

  useEffect(() => {
    // --- TIMING ADJUSTED FOR FASTER ANIMATION ---
    // Timer to switch to the 'targeting' phase
    const targetingTimer = setTimeout(() => {
      setPhase('targeting');
    }, 800); // Was 2500ms

    // Timer to switch to the 'locked' phase and show content
    const lockedTimer = setTimeout(() => {
      setPhase('locked');
    }, 1500); // Was 4000ms

    // Cleanup timers when the component unmounts
    return () => {
      clearTimeout(targetingTimer);
      clearTimeout(lockedTimer);
    };
  }, []);

  return (
    <div
      className="splash-container"
      style={{ backgroundImage: `url(${CamoBg})` }}
    >
      <div className="splash-overlay"></div>

      {/* Radar System with Grid and Animations */}
      <div className="radar-system">
        {/* Static Grid Lines */}
        <div className="radar-grid-line" style={{ width: '100%', height: '100%' }}></div>
        <div className="radar-grid-line" style={{ width: '66.66%', height: '66.66%' }}></div>
        <div className="radar-grid-line" style={{ width: '33.33%', height: '33.33%' }}></div>

        {/* --- RADAR SWEEP NOW CONTINUES --- */}
        {/* The condition to hide this on 'locked' phase has been removed. */}
        <div className="radar-sweep-container">
          <div className="radar-sweep-line"></div>
        </div>

        {/* Scanning Blips - still only appear during the 'scanning' phase */}
        {phase === 'scanning' && (
          <>
            <div className="blip" style={{ top: '20%', left: '30%' }}></div>
            <div className="blip" style={{ top: '50%', left: '75%', animationDelay: '0.5s' }}></div>
            <div className="blip" style={{ top: '60%', left: '15%', animationDelay: '1s' }}></div>
          </>
        )}

        {/* Target Marker - appears during 'targeting' and 'locked' phases */}
        {phase !== 'scanning' && (
          <div className="target-marker" style={{ top: '25%', left: '65%' }}></div>
        )}
      </div>
      
      {/* Content - only appears in the 'locked' phase */}
      {phase === 'locked' && (
        <div className="content-container">
          <img className="logo" src={SidakLogo} alt="Sidak Logo" />
          <h1 className="welcome-text" style={{ animationDelay: '0.2s' }}>
            Welcome to Sidak Ground control Software
          </h1>
          <p className="tagline-hindi" style={{ animationDelay: '0.4s' }}>
            भारत की सुरक्षा, हमारी प्राथमिकता
          </p>
          <p className="tagline-english" style={{ animationDelay: '0.6s' }}>
            "Bharat ki Suraksha, Hamari Prathmikta"
          </p>
        </div>
      )}
    </div>
  );
};

export default Splash;