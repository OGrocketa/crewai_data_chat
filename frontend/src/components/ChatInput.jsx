import React, {useRef} from 'react'
import { ArrowRightIcon,FileIcon } from "@radix-ui/react-icons"


export const ChatInput = () => {
    const fileInputRef = useRef(null);

    return (
        <div className="bg-[#2e3136] border-t border-gray-700 p-4 sticky bottom-0">
        <div className="flex items-center">
            <div className="flex-grow">
            <textarea
                className="w-full px-4 py-2 bg-[#40444b] text-white rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[#7289da] placeholder-gray-400 "
                placeholder="Type a message..."
                rows="1"
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
                    className="h-10 bg-[#40444b7a] hover:bg-[#40444b] text-white px-4 rounded-md transition-colors"
                    aria-label="Upload file"
                >
                    <FileIcon className="h-5 w-5" />
                </button>
            </div>

            <div className="ml-2">
            <button
                className="h-10 bg-green-400 hover:bg-green-600 text-white px-4 rounded-md transition-colors"
                type="button"
            >
                <ArrowRightIcon/>
            </button>
            </div>
        </div>
        </div>
    )
    }