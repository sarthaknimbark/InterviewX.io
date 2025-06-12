'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

enum CallStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  CONNECTING = 'CONNECTING',
  DISCONNECTED = 'DISCONNECTED',
}

interface AgentProps {
  userName: string
}

const Agent: React.FC<AgentProps> = ({ userName }) => {
  const callStatus = CallStatus.DISCONNECTED // Replace with real logic
  const isSpeaking = true // Replace with real logic
  const message = [
    'What’s your name?',
    'My name is Sarthak, nice to meet you!',
  ]
  const lastMessage = message[message.length - 1]

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
              key={lastMessage}
              className={cn(
                'transition-opacity duration-500 opacity-0 animate-fadeIn'
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center mt-6">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call px-4 py-2 bg-green-500 text-white rounded-lg">
            <span
              className={cn(
                'absolute w-full h-full rounded-full bg-green-400 opacity-75 animate-ping',
                callStatus !== CallStatus.CONNECTING && 'hidden'
              )}
            />
            <span className="relative z-10">
              {callStatus === CallStatus.INACTIVE ||
              callStatus === CallStatus.DISCONNECTED
                ? 'Call'
                : '...'}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect px-4 py-2 bg-red-500 text-white rounded-lg">
            End
          </button>
        )}
      </div>
    </>
  )
}

export default Agent
