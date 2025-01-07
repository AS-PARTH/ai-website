import React from "react";
import { type Message as TMessage } from "ai/react";
import Message from "../Message";
import { MessageSquare } from "lucide-react";

interface MessagesProps {
  messages: TMessage[];
}

const Messages = ({ messages }: MessagesProps) => {
  return (
    <div className="flex flex-col flex-1 max-h-[calc(100vh-7rem)] overflow-y-auto p-4 space-y-4">
      {messages.length ? (
        messages.map((message, i) => (
          <Message
            key={i}
            content={message?.content}
            isUserMessage={message?.role === "user"}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 space-y-2">
          <MessageSquare className="w-12 h-12 text-blue-500" />
          <h3 className="text-xl font-semibold text-white">What can I help with?</h3>
          <p className="text-sm text-gray-400">Ask your question to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
