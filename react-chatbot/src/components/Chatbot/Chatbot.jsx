import { useState, useEffect } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { Card, CardContent } from "@/components/ui/card";

export default function Chatbot() {
  const [showIntro, setShowIntro] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "bot" }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (text) => {
    const newMessage = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [
      ...prev,
      newMessage,
      { id: Date.now() + 1, text: "Okay!!!", sender: "bot" }
    ]);
  };

  if (showIntro) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <h1 className="text-3xl font-bold animate-pulse">Loading Chatbot...</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Card className="w-full max-w-md h-[600px] flex flex-col shadow-2xl rounded-2xl border border-gray-200">
        <div className="bg-blue-600 text-white text-lg font-semibold px-4 py-3 rounded-t-2xl">
          Chatbot
        </div>
        <CardContent className="flex flex-col flex-grow overflow-y-auto p-4 space-y-3 bg-white">
          {messages.map((msg) => (
            <Message key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
        </CardContent>
        <div className="p-3 border-t bg-gray-50 rounded-b-2xl">
          <InputBox onSend={handleSend} />
        </div>
      </Card>
    </div>
  );
}
