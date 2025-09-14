import Chatbot from "./components/Chatbot/Chatbot";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--Gray-900)] p-4">
      <div className="w-full max-w-3xl">
        <Chatbot />
      </div>
    </div>
  );
}