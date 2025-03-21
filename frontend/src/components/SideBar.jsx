import React from 'react'
import ChatCardSidebar from './ChatCardSidebar'
import { GoSidebarExpand } from "react-icons/go";
import { RiChatNewLine } from "react-icons/ri";

const SideBar = ({ onToggle,chats,handleSelectChat }) => {

  return (
    <div className='w-full h-full bg-[hsl(0,0%,10%)] flex flex-col'>
      <div className='w-full p-3 flex justify-end border-b border-gray-800'>
      <button>
          <RiChatNewLine className='size-7 mx-5 text-white hover:text-gray-300 cursor-pointer' />
      </button>

      <button>
        <GoSidebarExpand className='text-white size-7 cursor-pointer hover:text-gray-300'  onClick={onToggle}/>
      </button>
        
      </div>

      <div className='overflow-y-auto w-full mx-auto'>
        {chats.map((messagesData,index) =>(
          <div key={index} onClick={() =>handleSelectChat(messagesData.id)}>
            <ChatCardSidebar message={messagesData.chat[0]?.message}/>
          </div>
          
        ))}
      </div>

    </div>
  )
}

export default SideBar