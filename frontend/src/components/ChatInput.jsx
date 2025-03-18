import React, {useRef, useEffect, useState} from 'react'
import { ArrowRightIcon,FileIcon } from "@radix-ui/react-icons"
import TextareaAutosize from 'react-textarea-autosize';
import { ErrorNotification } from '../notifications/ErrorNotification'; 
import sendMessage from '../api/sendMessage';


export const ChatInput = ({addMessage}) => {
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const [filesUploaded, setFilesUploaded] = useState([]);
    const [canAskQuestions, setCanAskQuestions] = useState(false);

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

    const UploadFiles = async (files) =>{
        const formData = new FormData();
        files.forEach((file)=>{
            formData.append('files', file);
        });
        try{
            const response = await fetch('http://127.0.0.1:8000/upload_file',{
                method: 'POST',
                body: formData,
            });
            if (!response.ok){
                console.error(response.status);
            }
            const data = await response.json();
            return data;
        }catch (error){
            console.error('Error uploading files:', error);
        };
    };

    const HandleMessageSent = async () =>{
        const message = textareaRef.current.value;
        if (!message.trim()) return;

        addMessage({ message, timestamp: new Date().toLocaleTimeString(), isOutgoing: true });
        textareaRef.current.value = '';
        try{
            if(filesUploaded.length >0){
                setCanAskQuestions((prev) => true);
                const uploadResponse = await UploadFiles(filesUploaded);

                setFilesUploaded([]); 
                fileInputRef.current.value = '';
            }
        
            if(canAskQuestions == false){
                ErrorNotification("You need to upload a file")
            }
            else{
                const response = await sendMessage(message);
                addMessage({ message: response, timestamp: new Date().toLocaleTimeString(), isOutgoing: false });

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