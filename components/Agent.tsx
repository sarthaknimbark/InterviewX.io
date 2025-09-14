'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}


interface AgentProps {
  userName: string;
  userId: string;
  type: string;
}

const Agent: React.FC<AgentProps> = ({ userName }) => {
  const callStatus: CallStatus = CallStatus.INACTIVE; // Replace with real logic
  const isSpeaking = true // Replace with real logic
  const message = [
    'What’s your name?',
    'My name is Sarthak, nice to meet you!',
  ]
  const lastMessage = message[message.length - 1]

  function handleDisconnect(): void {
    throw new Error('Function not implemented.')
  }

  function handleCall(): void {
    throw new Error('Function not implemented.')
  }

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar relative">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && (
              <span className="animate-speak absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
            )}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {message.length > 0 && (
        <div className="transcript-border mt-4">
          <div className="transcript">
            <p
              className={cn(
                'transition-opacity duration-500 opacity-0 animate-fadeIn'
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

     <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus === CallStatus.CONNECTING ? "" : "hidden"
              )}
            />

            <span className="relative">
              {callStatus === CallStatus.INACTIVE
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  )
}

export default Agent