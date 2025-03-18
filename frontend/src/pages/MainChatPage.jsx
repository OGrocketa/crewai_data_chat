import React, { useEffect, useState } from 'react'
import Chat from '../components/Chat'   
import SideBar from '../components/SideBar'
import { GoSidebarCollapse } from "react-icons/go";
import { RiChatNewLine } from "react-icons/ri";
import getUserData from '../../firebase/getData/getUserData';


const MainChatPage = () => {
  const [sideBarVisible, setSidebarVisible] = useState(true)
  const [userData, setUserData] = useState();
  const [chatId, setChatId] = useState('');

  const toggleSidebar = () =>{
    setSidebarVisible(!sideBarVisible);
  }

  useEffect(()=>{
    getUserData('mYvT3KjSqRUcfSxP4fN3').then((data) =>{
      setUserData(data);
    });

  },[])
  
  useEffect(()=>{
    if(userData){
      setChatId(userData.user_chats[0]);
    }
  },[userData]);

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
                <GoSidebarCollapse className='size-7 hover:text-gray-300 cursor-pointer' onClick={toggleSidebar}/>
              </button>
              <button>
                <RiChatNewLine className='size-7 mx-5 hover:text-gray-300 cursor-pointer' />
              </button>
              
            </div>
          )}
          <Chat chat_id={chatId}/> 
      </div>
        
    </div>
  )
}

export default MainChatPage