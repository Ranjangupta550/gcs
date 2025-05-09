// src/components/NotFoundPage.js
// Make sure to install react-router-dom if you haven't: npm install react-router-dom
import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder Drone Icon SVG - Replace with your own drone SVG if you have one.
// This SVG includes a subtle ping animation on its "sensor".
const DroneIcon = () => (
  <svg
    className="w-full h-auto text-sky-400 drop-shadow-[0_5px_15px_rgba(14,165,233,0.4)]" // Tailwind class for drop shadow
    viewBox="0 0 200 200"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Lost drone icon"
  >
    {/* Main Body */}
    <path d="M100,25 C80,25 65,35 60,45 L40,70 V90 H20 V110 H40 V130 L60,155 C65,165 80,175 100,175 C120,175 135,165 140,155 L160,130 V110 H180 V90 H160 V70 L140,45 C135,35 120,25 100,25 Z M100,160 C90,160 85,155 80,150 L70,135 V115 H130 V135 L120,150 C115,155 110,160 100,160 Z" />
    {/* Central part */}
    <path d="M90 70 H110 V130 H90 V70 Z" fillOpacity="0.6"/>
    {/* "Lens" or "Sensor" part */}
    <circle cx="100" cy="100" r="25" fill="rgba(255,255,255,0.1)" />
    <circle cx="100" cy="100" r="15" className="text-sky-300 animate-ping-slow opacity-75" />
    <circle cx="100" cy="100" r="10" fill="rgba(14,165,233,0.7)" />

    {/* Simplified Propellers (4 arms) - non-animated rotation for simplicity in SVG */}
    {/* Top-left arm */}
    <rect x="40" y="40" width="50" height="12" rx="6" transform="rotate(-45 65 65)" className="opacity-80"/>
    {/* Top-right arm */}
    <rect x="110" y="40" width="50" height="12" rx="6" transform="rotate(45 135 65)" className="opacity-80"/>
    {/* Bottom-left arm */}
    <rect x="40" y="110" width="50" height="12" rx="6" transform="rotate(45 65 135)" className="opacity-80"/>
    {/* Bottom-right arm */}
    <rect x="110" y="110" width="50" height="12" rx="6" transform="rotate(-45 135 135)" className="opacity-80"/>
  </svg>
);

const NotFoundPage = () => {
  return (
    // Main container: Full screen, dark background, GCS mono font, centered items.
    // Relative positioning for absolute positioned child elements (grid, scanlines).
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 font-mono relative overflow-hidden">
      
      {/* Background Decorative Elements: Grid and Scanlines */}
      {/* These are positioned absolutely to cover the entire background, with low opacity. */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern: Uses custom Tailwind class 'bg-grid-pattern' and 'bg-grid-size'. */}
        {/* Opacity is applied directly here to make it subtle. */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid-size text-gray-700 opacity-[0.07]"></div>
        {/* Scanlines effect: Uses 'bg-scanlines-pattern', 'bg-scanlines-size', and 'animate-scanline-scroll'. */}
        <div className="absolute inset-0 bg-scanlines-pattern bg-scanlines-size text-black animate-scanline-scroll opacity-[0.05]"></div>
      </div>

      {/* Content Area: Textual information and navigation button. */}
      {/* Arranged in a column, centered, with responsive text alignment and ordering for different screen sizes. */}
      <div className="z-10 flex flex-col items-center lg:items-start lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-10 order-2 lg:order-1">
        {/* 404 Error Code: Large, bold, sky-blue color, with a custom text pulse animation. */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-sky-400 animate-text-pulse">
          404
        </h1>
        {/* Thematic Error Message: Describes the error in GCS terms. */}
        <p className="text-2xl sm:text-3xl md:text-4xl mt-4 mb-2 font-semibold text-gray-200">
          SYSTEM OFFLINE
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-400 max-w-md lg:max-w-none">
          Lost signal. The requested coordinates do not match any known waypoints.
          Please verify your flight plan or return to base.
        </p>
        {/* Navigation Button: Links back to the homepage ('/'). */}
        {/* Styled with Tailwind for appearance, hover effects, and focus states. */}
        <Link
          to="/" 
          className="px-6 py-3 sm:px-8 sm:py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-sky-500/50 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-400 focus:ring-opacity-75"
        >
          Return to Base
        </Link>
      </div>

      {/* Drone Visual Area: Contains the animated drone icon. */}
      {/* Positioned to the side on larger screens, and above text on smaller screens due to 'order' classes. */}
      <div className="z-10 lg:w-1/2 flex justify-center items-center order-1 lg:order-2 mb-10 lg:mb-0">
        {/* Drone Container: Applies the 'animate-gentle-bob' for a hovering effect. */}
        {/* Responsive sizing for the drone. */}
        <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[480px] xl:h-[480px] animate-gentle-bob">
          <DroneIcon />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
