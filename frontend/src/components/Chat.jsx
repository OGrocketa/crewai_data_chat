import React, { useRef, useEffect } from 'react'
import { Message } from './Message'
import { ChatInput } from './ChatInput';
import { messages } from '../messages';

const Chat = () => {
    const messagesEndRef = useRef(null);
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
      
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-[#212121] h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 pt-4">
                {messages.map((message, index) => (
                    <Message 
                        key={index} 
                        message={message.message} 
                        timestamp={message.timestamp} 
                        isOutgoing={message.isOutgoing} 
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="px-4 pb-4">
                <ChatInput />
            </div>
        </div>
    )
}

export default Chat