import { Button, Textarea } from "@nextui-org/react";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import React from "react";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
}

const ChatInput = ({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
}: ChatInputProps) => {
  return (
    <div className="bg-gray-900 border-t border-gray-700 py-4 px-6">
      <form className="relative flex items-center" onSubmit={handleSubmit}>
        <Textarea
          minRows={1}
          autoFocus
          placeholder="Enter Your Question..."
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
              setInput("");
            }
          }}
          onChange={handleInputChange}
          className="resize-none bg-gray-800 text-white placeholder-gray-400 rounded-lg py-2 px-4 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          size="sm"
          type="submit"
          className="ml-3  bg-black hover:bg-zinc-700 text-white rounded-lg px-4 py-2 flex items-center">
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
