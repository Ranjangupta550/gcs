import React from 'react'
const ParaCard = React.memo(({ title, value, unit }) => {
    return (
     <div className='parameter-card h-11  w-full  text-white
     place-content-evenly bg-backgroundSecondary rounded-md  fle-grax  flex-col '>
        <h3 className='text-yellow-300 text-[10px]  ml-1'>{title}</h3>
        <div className=' items-center justify-center' >
        <div className='flex items-center relative'>
        <p className='w-3/4  items-center justify-center overflow-hidden flex'>{value}</p>
        <p className='text-white text-[10px] flex items-center justify-center w-6  absolute right-1'>{unit}</p>
        </div>
        </div>
   
     </div>
    );
  });
export default ParaCard;