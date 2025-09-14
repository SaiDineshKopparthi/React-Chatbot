import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import TypingDots from "./TypingDots";
import { Card, CardHeader, CardContent } from "@/components/ui/card";


function StartupScreen({ fadingOut }) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-[600px] min-w-[660px] rounded-2xl bg-[var(--Gray-800)] text-[var(--White)] shadow-xl border border-[var(--Gray-700)] ${fadingOut ? "animate-fadeOut" : "animate-fadeIn"
        }`}
    >
      <h1 className="text-2xl font-bold text-[var(--Green)] mb-4">Welcome</h1>
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-[var(--Green)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-3 h-3 bg-[var(--Green)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-3 h-3 bg-[var(--Green)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}



export default function Chatbot() {
  const defaultMessage = { id: 1, text: "Hello! How can I help you?", sender: "bot" };
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [defaultMessage];
  });
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);


  useEffect(() => {
    const timer = setTimeout(() => setIsFadingOut(true), 1200);
    const finalTimer = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      clearTimeout(timer);
      clearTimeout(finalTimer);
    };
  }, []);

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

  const handleSend = async (text) => {
    const userMsg = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:3002/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      console.log(data);

      const botMsg = { id: Date.now() + 1, text: data.response?.trim() || "No response", sender: "bot" };


      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { id: Date.now() + 1, text: "Error contacting server.", sender: "bot" };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }

  };

  const handleClear = () => {
    setMessages([defaultMessage]);
    localStorage.setItem("chatMessages", JSON.stringify([defaultMessage]));
  };

  if (isLoading) {
    return <StartupScreen fadingOut={isFadingOut} />;
  }

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
        <InputBox
          onSend={handleSend}
          onClear={handleClear}
          canClear={messages.length > 1}
        />
      </div>
    </Card>
  );
}