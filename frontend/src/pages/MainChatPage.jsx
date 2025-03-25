import React, { createContext, useEffect, useState } from 'react'
import Chat from '../components/Chat'   
import SideBar from '../components/SideBar'
import { GoSidebarCollapse } from "react-icons/go";
import { RiChatNewLine } from "react-icons/ri";
import getUserData from '../../firebase/getData/getUserData';
import getUserChats from '../../firebase/getData/getUserChats';

export const UserIdContext = createContext(null); 

const MainChatPage = ({user_id}) => {
  const [sideBarVisible, setSidebarVisible] = useState(true)
  const [userData, setUserData] = useState();
  const [chatId, setChatId] = useState(null);
  const [userChats, setUserChats] = useState([]);

  const toggleSidebar = () =>{
    setSidebarVisible(!sideBarVisible);
  }

  const handleSelectChat = (id) => {
    setChatId(id);
  };

  useEffect(()=>{
    getUserData(user_id).then((data) =>{
      setUserData(data);
    });

  },[])
  
  useEffect(()=>{
    if(userData){
      getUserChats(userData.user_chats).then((data)=>
        setUserChats(data)
      );
    }
  },[userData]);

  return (
    <UserIdContext.Provider value={user_id}>
      <div className='w-full h-screen flex '>
        <div className={`h-full transition-all duration-300 ease-in-out ${sideBarVisible ? 'w-50' : 'w-0'}  overflow-hidden`}>
          <div className="w-50 h-full">
                <SideBar onToggle={toggleSidebar} chats={userChats} handleSelectChat={handleSelectChat}/>
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
              <Chat chat_id={chatId} handleChatId={setChatId}/> 
        </div>
        
      </div>
    </UserIdContext.Provider>
    
  )
}

export default MainChatPage