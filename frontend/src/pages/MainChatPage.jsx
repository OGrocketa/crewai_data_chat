import React, { useState } from 'react'
import Chat from '../components/Chat'   
import SideBar from '../components/SideBar'
import { GoSidebarCollapse } from "react-icons/go";

const MainChatPage = () => {
  const [sideBarVisible, setSidebarVisible] = useState(true)

  const toggleSidebar = () =>{
    setSidebarVisible(!sideBarVisible);
  }

  return (
    <div className='w-full h-screen flex '>
      <div className={`h-full transition-all duration-300 ease-in-out ${sideBarVisible ? 'w-50' : 'w-0'}  overflow-hidden`}>
        <div className="w-50 h-full">
              <SideBar onToggle={toggleSidebar}/>
        </div>
      </div>
       
      <div className="flex-1 h-full">
          {!sideBarVisible &&(
            <div className='absolute text-white top-0 left-0 px-3 py-3'>
              <button onClick={toggleSidebar}>
                <GoSidebarCollapse className='size-7' />
              </button>
              
            </div>
          )}
          <Chat/> 
      </div>
        
    </div>
  )
}

export default MainChatPage