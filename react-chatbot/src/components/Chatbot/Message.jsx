export default function Message({ text, sender }) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-4 py-2 rounded-xl text-sm font-medium max-w-[75%] break-words ${
          isUser
            ? "bg-[var(--Green)] text-[var(--Gray-900)] self-end rounded-br-none"
            : "bg-[var(--Gray-700)] text-[var(--White)] self-start rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}