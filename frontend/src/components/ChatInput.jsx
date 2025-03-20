import React, {useRef, useEffect, useState} from 'react'
import { ArrowRightIcon,FileIcon } from "@radix-ui/react-icons"
import TextareaAutosize from 'react-textarea-autosize';
import { ErrorNotification } from '../notifications/ErrorNotification'; 
import sendMessage from '../api/sendMessage';
import { Timestamp } from "firebase/firestore";
import addMessage from '../../firebase/updateData/addMessage';
import getChat from '../../firebase/getData/getChat';
import UploadFiles from '../api/UploadFiles';


export const ChatInput = ({chat_id, messages, uploadedFiles,setChatData}) => {
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const [filesUploaded, setFilesUploaded] = useState([]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e)=>{
        const files = Array.from(e.target.files);
        setFilesUploaded(files);
    }

    const HandleMessageSent = async () =>{
        const message = textareaRef.current.value;
        if (!message.trim()) return;

        textareaRef.current.value = '';
        try{
            if(filesUploaded.length >0 || uploadedFiles ){
                if(filesUploaded.length){
                    await UploadFiles(filesUploaded);
                    setFilesUploaded([]); 
                }
                else{
                    addMessage(chat_id,{ message: message, timestamp: Timestamp.now(), type: 'HumanMessage' });
                    getChat(chat_id).then((data) => setChatData(data));
                    const response = await sendMessage(message);
                    addMessage(chat_id, { message: response, timestamp: Timestamp.now(), type: 'AiMessage' });
                    getChat(chat_id).then((data) => setChatData(data));
                }
                fileInputRef.current.value = '';
            }
            else{
                ErrorNotification("You need to upload a file")
            }
        }catch (error){
            console.error(error);
        };
    };

    return (
        <div className="bg-[#303030]  border-gray-700 p-4 mb-2 sticky bottom-0 rounded-2xl flex items-center">
            <div className="flex-grow">
                <TextareaAutosize
                    ref={textareaRef}
                    className='w-full px-4 py-2 text-white rounded-md resize-none focus:outline-none placeholder-gray-400'
                    placeholder="Type a message..."
                    maxRows = "5"
                    minRows = "1"
                    onKeyDown={(e)=>{
                        if(e.key == 'Enter'){
                            e.preventDefault();
                            HandleMessageSent();
                        }
                    }}
                />
            </div>

            
            <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                id="file-upload"
                onChange={handleFileChange}
            />

            <div className="ml-2">
                <button
                    onClick={handleFileButtonClick}
                    className="h-10 bg-[#40444b7a] hover:bg-[#40444b] text-white px-4 rounded-md transition-colors"
                >
                    <FileIcon className="h-5 w-5" />
                </button>
            </div>

            <div className="ml-2">
            <button
                className="h-10 bg-green-400 hover:bg-green-600 text-white px-4 rounded-md transition-colors"
                type="button"
                onClick={HandleMessageSent}
            >
                <ArrowRightIcon/>
            </button>
            </div>
        </div>
    )
    }