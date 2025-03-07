import React from 'react'
import ChatCard from './ChatCard'
import { messages } from '../messages'
import { GoSidebarExpand } from "react-icons/go";

const SideBar = ({ onToggle }) => {

  return (
    <div className='w-full h-full bg-[hsl(0,0%,10%)] flex flex-col'>
      <div className='w-full p-3 flex justify-end border-b border-gray-800'>
        <GoSidebarExpand className='text-white size-7 cursor-pointer hover:text-gray-300'  onClick={onToggle}/>
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