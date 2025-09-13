import * as React from "react";

export default function TypingDots() {
  return (
    <div
      aria-label="Bot is typing"
      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--Gray-700)] text-[var(--White)] shadow-sm w-fit"
    >
      <span className="sr-only">Bot is typing…</span>
      <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}