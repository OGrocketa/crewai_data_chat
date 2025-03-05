import React from 'react'
import { Message } from './Message'
import { ChatInput } from './ChatInput';
import { messages } from '../messages';
export const ChatScreeen = () => {

  return (
    <div className="bg-[#212121] min-h-screen w-full">
      {/* Messages container with centered content */}
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-24">
        {messages.map((message, index) => (
          <Message key={index} message={message.message} timestamp={message.timestamp} isOutgoing={message.isOutgoing} />
        ))}
      </div>
      
      {/* Fixed chat input at the bottom */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="max-w-3xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
     
  )
}
