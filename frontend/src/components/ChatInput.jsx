import React, {useRef, useEffect, useState, useContext} from 'react'
import { ArrowRightIcon,FileIcon } from "@radix-ui/react-icons"
import TextareaAutosize from 'react-textarea-autosize';
import { ErrorNotification } from '../notifications/ErrorNotification'; 
import sendMessage from '../api/sendMessage';
import { Timestamp } from "firebase/firestore";
import addMessage from '../../firebase/updateData/addMessage';
import getChat from '../../firebase/getData/getChat';
import UploadFiles from '../api/UploadFiles';
import createChat from '../../firebase/createData/createChat';
import { UserIdContext } from '../pages/MainChatPage';


export const ChatInput = ({chat_id, uploadedFiles,setChatData,setLoading}) => {
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const user_id = useContext(UserIdContext);
    const [filesUploaded, setFilesUploaded] = useState([]);
    const [chatId, setChatId] = useState(chat_id);

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
            let currentChatId = chatId;
            if(filesUploaded.length >0 || uploadedFiles ){
                if(!chatId){
                    console.log(user_id);
                    currentChatId = await createChat(user_id);
                    setChatId(currentChatId);
                }

                if(filesUploaded.length){
                    await UploadFiles(filesUploaded,currentChatId);
                    setFilesUploaded([]); 
                }
                
                setLoading(true);
                addMessage(currentChatId,{ message: message, timestamp: Timestamp.now(), type: 'HumanMessage' });
                getChat(currentChatId).then((data) => setChatData(data));
                const response = await sendMessage(message);
                setLoading(false);
                addMessage(currentChatId, { message: response, timestamp: Timestamp.now(), type: 'AiMessage' });
                getChat(currentChatId).then((data) => setChatData(data));
                
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
                multiple
                accept="application/pdf"
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