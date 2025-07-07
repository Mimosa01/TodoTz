import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Whats need to be done?"
        className="p-4 pl-15 w-full text-2xl font-extralight border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />
    </form>
  );
}
