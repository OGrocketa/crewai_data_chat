import React from 'react'
import ChatCard from './ChatCard'
import { messages } from '../messages'
import { GoSidebarExpand } from "react-icons/go";
import { RiChatNewLine } from "react-icons/ri";

const SideBar = ({ onToggle }) => {

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
        {messages.map((message,index) =>(
          <ChatCard key={index} message={message.message}/>
        ))}
      </div>

    </div>
  )
}

export default SideBar