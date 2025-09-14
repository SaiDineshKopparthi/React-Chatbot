import ReactMarkdown from "react-markdown";

export default function Message({ text, sender }) {
  return (
    <div
      className={`
        max-w-[75%] px-4 py-2 rounded-lg shadow 
        ${sender === "user"
          ? "ml-auto bg-[var(--Green)] text-black"
          : "mr-auto bg-[var(--Gray-700)] text-white"}
      `}
    >
      <div className="prose prose-invert">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}