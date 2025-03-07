import React from 'react'

const ChatCard = ({message}) => {
  return (
    <div className='flex items-center p-2 hover:bg-[hsl(0,0%,15%)] rounded-md cursor-pointer my-2'>
      <p className="text-white text-sm truncate">{message}</p>
    </div>
  )
}

export default ChatCard