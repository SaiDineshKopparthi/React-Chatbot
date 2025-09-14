import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function InputBox({ onSend, onClear, canClear }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(e);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <form onSubmit={submit} className="flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={1}
        className="
          flex-1 border-none rounded-lg resize-none
          bg-[var(--Gray-700)] text-[var(--White)]
          placeholder:text-gray-300
          focus-visible:ring-2 focus-visible:ring-[var(--Green)]
          px-3 py-2 leading-5
          max-h-32 overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
          hover:scrollbar-thumb-gray-500
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


      <Button
        type="button"
        onClick={onClear}
        disabled={!canClear}
        aria-label="Clear chat"
        className={`
    rounded-lg
    bg-[var(--Green)] text-black
    hover:brightness-110 transition
    px-4 h-10 flex items-center justify-center
    ${!canClear ? "opacity-50 cursor-not-allowed" : ""}
  `}
      >
        Clear
      </Button>

    </form>
  );
}