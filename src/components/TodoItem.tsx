import type { Item } from "../features/todos/types";

type Props = {
  todo: Item;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem ({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center justify-between px-2 py-4 border-b border-neutral-100 hover:bg-gray-50">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 accent-blue-500 rounded-full"
        />
        <span className={`text-base ${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.text}
        </span>
      </label>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-400 hover:text-red-600 text-sm"
        aria-label="Delete todo"
      >
        ✕
      </button>
    </li>
  );
};
