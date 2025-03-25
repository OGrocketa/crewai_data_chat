import React, { useRef, useEffect, useState } from 'react'
import { Message } from './Message'
import { ChatInput } from './ChatInput';
import getChat from '../../firebase/getData/getChat';
import ClipLoader from "react-spinners/ClipLoader";
import { FaFileAlt } from "react-icons/fa";

const Chat = ({chat_id, handleChatId}) => {
    const messagesEndRef = useRef(null);
    const [chat_data, setChatData] = useState();
    const [loading, setLoading] = useState(false);
    const [filesUploading, setFilesUploading] = useState(false);
    const [uploadedFilesNames, setUploadedFilesNames] = useState([]);

    useEffect(()=>{
        if(chat_id){
            getChat(chat_id).then((data) => {
                setChatData(data)});

        }else{
            setChatData();
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
                    {chat_data?.chat?.length > 0 && chat_data.chat.map((message, index) => (
                            <Message 
                                key={index} 
                                message={message.message} 
                                timestamp={message.timestamp.toDate()} 
                                isOutgoing={message['type'] == 'HumanMessage' ? true : false} 
                            />
                    ))}
                    {loading && 
                    <div className="max-w-2xl mx-auto flex flex-row text-center text-white">
                        <ClipLoader color={'#66BB6A'} speedMultiplier={0.9}/>
                        <p>{filesUploading ?"Uploading Files ..." : "Thinking on the answer ..."}</p>
                    </div>
                    }
                    <div ref={messagesEndRef} />
                </div>
            </div>
            
            <div className="w-full pb-4">
                <div className="max-w-2xl mx-auto px-4">
                    <div className='flex flex-row text-gray-300 text-sm mb-2'>
                        {
                            uploadedFilesNames.map((fileName, index) => (
                                <div className='flex flex-row mx-2'>
                                    <FaFileAlt key={index}/>
                                    <p key={index}>{fileName}</p>
                                </div>
                                
                            ))
                        }
                    </div>

                    <ChatInput
                        chat_id={chat_id}
                        messages={chat_data?.chat}
                        uploadedFiles={chat_data?.filesUploaded}
                        setChatData={setChatData}
                        setLoading={setLoading}
                        awsFilesLinks={chat_data?.filesLinks}
                        handleChatId={handleChatId}
                        setFilesUploading={setFilesUploading}
                        setUploadedFilesNames= {setUploadedFilesNames}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chat