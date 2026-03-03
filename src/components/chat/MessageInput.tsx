import { useState } from "react";

export const MessageInput = ({ conversationId }: { conversationId: string }) => {
  const [value, setValue] = useState("");

  const sendMessage = async () => {
    if (!value.trim()) return;

    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ conversationId, content: value }),
    });

    setValue("");
  };

  return (
    <div className="p-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-4/5"
      />
      <button
        onClick={sendMessage}
        className="shrink-0 bg-primary text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        送信
      </button>
    </div>
  );
};
