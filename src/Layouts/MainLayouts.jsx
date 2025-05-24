import React from "react";
import { Outlet } from "react-router-dom";
import { Home } from "../index";
import { BrowserRouter,Route,Router } from "react-router-dom";


function MainLayouts() {
    return (
        <div className="App flex bg-backgroundPrimary h-screen w-screen border-2 border-borderColor rounded-lg  overflow-hidden items-center justify-center ">
            
         
            <div className="flex item-center justify-center bg-backgroundTertiary  h-full w-full rounded-lg text-white overflow-hidden">
              <Outlet />
            </div>
            {/* <Outlet /> */}
        </div>
    )
}
export default MainLayouts;