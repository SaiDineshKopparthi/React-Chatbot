import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  ]);

  const handleSend = (text) => {
    const userMsg = { id: Date.now(), text, sender: "user" };
    const botMsg = {
      id: Date.now() + 1,
      text: "Thanks, noted!",
      sender: "bot",
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <Card
      className="
    min-w-[660px]           /* widened by 200px total */
    h-[600px]               /* fixed height */
    rounded-2xl shadow-xl border border-[var(--Gray-700)]
    bg-card text-card-foreground flex flex-col
  "
    >
      {/* Header stays fixed */}
      <CardHeader className="p-6 border-b border-[var(--Gray-700)] shrink-0">
        <h1 className="text-center text-xl font-bold tracking-tight text-[var(--primary)]">
          Chat Assistant
        </h1>
      </CardHeader>

      {/* Body split into scrollable messages + pinned input */}
      <CardContent className="flex flex-col flex-1 p-0 bg-card">
        {/* messages area gets the scroll */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <Message key={m.id} text={m.text} sender={m.sender} />
          ))}
        </div>

        {/* input stays pinned */}
        <div className="p-4 border-t border-[var(--Gray-700)] bg-card shrink-0">
          <InputBox onSend={handleSend} />
        </div>
      </CardContent>
    </Card>
  );
}
