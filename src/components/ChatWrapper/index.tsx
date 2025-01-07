"use client";

import { Message, useChat } from "ai/react";
import Messages from "../Messages";
import ChatInput from "../ChatInput";

const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { messages, handleInputChange, input, handleSubmit, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages,
    });

  return (
    <div className="relative min-h-full bg-gray-900 flex flex-col justify-between divide-y divide-gray-700">
      <div className="flex-1 text-white bg-gray-800 flex flex-col p-4">
        <Messages messages={messages} />
      </div>
      <ChatInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};

export default ChatWrapper;
