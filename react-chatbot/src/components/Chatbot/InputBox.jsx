import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function InputBox({ onSend }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(e); 
    }
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={1}
        className="
          flex-1 border-none rounded-lg resize-none
          bg-[var(--Gray-700)] text-[var(--White)]
          placeholder:text-gray-300
          focus-visible:ring-2 focus-visible:ring-[var(--Green)]
          px-3 py-2
        "
      />

      <Button
        type="submit"
        disabled={!text.trim()}
        aria-label="Send message"
        className="
          rounded-lg
          bg-[var(--Green)] text-black
          hover:brightness-110 transition
          w-12 h-10 flex items-center justify-center
        "
      >
        <ArrowUpRight size={18} />
      </Button>
    </form>
  );
}