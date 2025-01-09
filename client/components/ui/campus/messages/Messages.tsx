'use client';

import { usePrivateMessageSocket } from "@/components/providers/private-message-socket-provider";
import { useEffect, useState } from "react";

export default function PrivateMessages(
  {userId}
  : {
    userId: string
  }
) {

  const [messages, setMessages] = useState<string[]>([]);
  const [ message, setMessage ] = useState('');

  const { socket } = usePrivateMessageSocket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    socket?.emit('new:message', {
      receiverId: '76c047b6-6f7a-4702-9540-fd0de3a9d775',
      message
    })
  }

  useEffect(() => {
    if (socket) {
      socket.on(`new:message`, (message) => {
        console.log(message)
        if (
          (message.from === userId && message.to === '76c047b6-6f7a-4702-9540-fd0de3a9d775')
          || (message.from === 'a2f6b10c-0b72-4e92-b958-6824c689771a' && message.to === userId)
        ) {
          setMessages((prevMessages) => [...prevMessages, message.content]);
        }
      });
    }
  }, [socket]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
        <button>Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={`msg:${index}`}>{message}</li>
        ))}
      </ul>
    </>
  )
}