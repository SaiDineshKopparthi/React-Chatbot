import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InputBox({ onSend }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="
          flex-1 border-none rounded-lg
          bg-[var(--Gray-700)] text-[var(--White)]
          placeholder:text-gray-300
          focus-visible:ring-2 focus-visible:ring-[var(--Green)]
        "
      />
      <Button
        type="submit"
        className="
          rounded-lg font-semibold
          bg-[var(--Green)] text-[var(--Gray-900)]
          hover:brightness-105
        "
      >
        Send
      </Button>
    </form>
  );
}