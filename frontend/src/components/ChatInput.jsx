import React, {useRef, useEffect, useState} from 'react'
import { ArrowRightIcon,FileIcon } from "@radix-ui/react-icons"
import TextareaAutosize from 'react-textarea-autosize';
import { ErrorNotification } from '../notifications/ErrorNotification'; 

export const ChatInput = () => {
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

    const HandleMessageSent = () =>{
        if(filesUploaded.length == 0){
            ErrorNotification("You need to upload a file")
        }
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
                />
            </div>

            
            <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                id="file-upload"
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