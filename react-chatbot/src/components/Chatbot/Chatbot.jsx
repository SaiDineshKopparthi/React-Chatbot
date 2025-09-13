import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import TypingDots from "./TypingDots";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!bottomRef.current) return;
    if (!didMountRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
      didMountRef.current = true;
    } else {
      requestAnimationFrame(() => {
        bottomRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userMsg = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    setIsTyping(true);

    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, text: "Thanks, noted!", sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <Card
      className="
        min-w-[660px]
        h-[600px]
        rounded-2xl shadow-xl border border-[var(--Gray-700)]
        bg-card text-card-foreground flex flex-col
      "
    >
      <CardHeader className="p-6 border-b border-[var(--Gray-700)] shrink-0">
        <h1 className="text-center text-xl font-bold tracking-tight text-[var(--primary)]">
          Chat Assistant
        </h1>
      </CardHeader>

      <CardContent className="flex-1 p-0 bg-card overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
        <div className="p-4 space-y-3">
          {messages.map((m) => (
            <Message key={m.id} text={m.text} sender={m.sender} />
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <TypingDots />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </CardContent>

      <div className="p-4 border-t border-[var(--Gray-700)] bg-card shrink-0">
        <InputBox onSend={handleSend} />
      </div>
    </Card>
  );
}