import React from 'react';
import ReactMarkdown from 'react-markdown';

export const Message = ({ message, timestamp, isOutgoing = false }) => {
  return (
    <div className={`flex mb-4 ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[70%] m-1">
        <div className={`p-3 rounded-lg shadow mx-2 ${isOutgoing ? 'bg-green-400' : 'bg-gray-100'}`}>
        <div className="text-sm break-words whitespace-normal text-left">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>

          {timestamp && (
            <div className="text-xs mt-1 text-right text-black">
              {timestamp}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
