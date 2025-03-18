import React, { useRef, useEffect, useState } from 'react'
import { Message } from './Message'
import { ChatInput } from './ChatInput';
import getChat from '../../firebase/getData/getChat';


const Chat = ({chat_id}) => {
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        if(chat_id){
            getChat(chat_id).then((data) => {
                setMessages(data)});
        }
    },[chat_id])
    
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
      
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const addMessage = (newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    

    return (
        <div className="bg-[hsl(0,0%,20%)] h-full flex flex-col w-full">
           <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-2xl mx-auto px-4 pt-4">
                    {messages && messages.map((message, index) => (
                            <Message 
                                key={index} 
                                message={message.message} 
                                timestamp={message.timestamp.toDate()} 
                                isOutgoing={message['type'] == 'HumanMessage' ? true : false} 
                            />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            
            <div className="w-full pb-4">
                <div className="max-w-2xl mx-auto px-4">
                    <ChatInput addMessage={addMessage} />
                </div>
            </div>
        </div>
    )
}

export default Chat