import { useState,useEffect } from "react";
import { BrowserRouter,Route,NavLink, } from "react-router-dom";
import { Home } from "../../index";
import  icons  from "../../assets/icons";


 function Navigation() {
    const navItems = [
        {
            name: "Home",
            to: "home",
            icon: icons.home,
        }
    ];
    return (
        <div className="flex flex-col w-24  h-full bg-backgroundSecondary border-r-[1px] border-borderColor text-neutral items-center justify-center font-robotoMon p-2 ">
            <div className="flex flex-col gap-y-2 w-full h-full items-center justify-center  ">
              {navItems.map((item)=>(
                <NavLink to={item.to} key={item.name} className={({isActive}) => (isActive ? 'bg-white' : '')
                + " flex items-center gap-x-2 w-full h-10 rounded-md hover:bg-white hover:bg-opacity-10 transition duration-200 ease-in-out"
                + " text-neutral hover:text-white"
                } >
                    <img src={item.icon} alt={item.name} className="w-6 h-6" />
                    <span className="text-sm">{item.name}</span>
                </NavLink>

              ))}
            </div>   
              
    
     </div>
        
    )
}
export default Navigation;