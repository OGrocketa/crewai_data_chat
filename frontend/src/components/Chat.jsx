import React, { useRef, useEffect, useState } from 'react'
import { Message } from './Message'
import { ChatInput } from './ChatInput';
import getChat from '../../firebase/getData/getChat';


const Chat = ({chat_id}) => {
    const messagesEndRef = useRef(null);
    const [chat_data, setChatData] = useState();

    useEffect(()=>{
        if(chat_id){
            getChat(chat_id).then((data) => {
                setChatData(data)});
        }
    },[chat_id])
    
    
    useEffect(() => {
        scrollToBottom();
    }, [chat_data?.chat]);
      
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    return (
        <div className="bg-[hsl(0,0%,20%)] h-full flex flex-col w-full">
           <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-2xl mx-auto px-4 pt-4">
                    {chat_data?.chat && chat_data.chat.map((message, index) => (
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
                    <ChatInput chat_id={chat_id} messages= {chat_data?.chat} uploadedFiles={chat_data?.filesUploaded} setChatData={setChatData}/>
                </div>
            </div>
        </div>
    )
}

export default Chat