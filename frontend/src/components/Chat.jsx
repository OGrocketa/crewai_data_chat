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
        <div className="bg-[hsl(0,0%,20%)] h-full flex flex-col w-full">
           <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-2xl mx-auto px-4 pt-4">
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
            </div>
            
            <div className="w-full pb-4">
                <div className="max-w-2xl mx-auto px-4">
                    <ChatInput />
                </div>
            </div>
        </div>
    )
}

export default Chat