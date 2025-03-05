import React from 'react'
import { Message } from './Message'
import { ChatInput } from './ChatInput';

export const ChatScreeen = () => {
    const messages = [
        {
            "message": "Hi there! I'm working on that data analysis you requested.",
            "timestamp": "10:03",
            "isOutgoing": true
        },
        {
            "message": "Great! When do you think it will be ready?",
            "timestamp": "10:04",
            "isOutgoing": false
        },
        {
            "message": "I should have the initial results by tomorrow morning. The dataset is quite large.",
            "timestamp": "10:05",
            "isOutgoing": true
        },
        {
            "message": "That works perfectly. Could you also include the visualization we discussed?",
            "timestamp": "10:07",
            "isOutgoing": false
        },
        {
            "message": "Yes, I'll prepare both bar charts and trend lines as we discussed. I'm also thinking of adding a heat map for the correlation matrix.",
            "timestamp": "10:08",
            "isOutgoing": true
        },
        {
            "message": "That sounds excellent! The heat map would be very helpful.",
            "timestamp": "10:10",
            "isOutgoing": false
        },
        {
            "message": "By the way, I noticed some inconsistencies in the data from March. Should I exclude those outliers or keep them in the analysis?",
            "timestamp": "10:12",
            "isOutgoing": true
        },
        {
            "message": "Good catch. Let's remove the outliers but mention them in the notes section of the report.",
            "timestamp": "10:15",
            "isOutgoing": false
        },
        {
            "message": "Will do! I'll also prepare a separate small analysis of just those outliers in case they're interesting.",
            "timestamp": "10:17",
            "isOutgoing": true
        },
        {
            "message": "Perfect. Looking forward to seeing the results tomorrow!",
            "timestamp": "10:18",
            "isOutgoing": false
        },
        {
            "message": "Hi there! I'm working on that data analysis you requested.",
            "timestamp": "10:03",
            "isOutgoing": true
        },
        {
            "message": "Great! When do you think it will be ready?",
            "timestamp": "10:04",
            "isOutgoing": false
        },
        {
            "message": "I should have the initial results by tomorrow morning. The dataset is quite large.",
            "timestamp": "10:05",
            "isOutgoing": true
        },
    ];
  return (
    <div className="bg-[#3C474B] min-h-screen w-full">
      {/* Messages container with centered content */}
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-24">
        {messages.map((message, index) => (
          <Message key={index} message={message.message} timestamp={message.timestamp} isOutgoing={message.isOutgoing} />
        ))}
      </div>
      
      {/* Fixed chat input at the bottom */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="max-w-3xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
     
  )
}
