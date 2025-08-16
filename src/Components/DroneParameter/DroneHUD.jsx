import React from 'react'

function DroneHUD() {
  return (
    <div className='bg-black/50 backdrop-blur-md w-5/6 h-16 rounded-full shadow-lg flex items-center justify-between p-4 relative mx-auto border-2 border-white/20'>
      <span className='text-white font-bold'>Drone HUD</span>
      <button className='bg-blue-500 text-white px-4 py-2 rounded'>Action</button>
    </div>
  )
}

export default DroneHUD
