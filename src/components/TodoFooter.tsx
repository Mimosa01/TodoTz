import type { Filter } from "../features/todos/types";

type Props = {
  remaining: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
  hasCompleted: boolean;
}

const filters: Filter[] = ['All', 'Active', 'Completed'];

export default function TodoFooter({
  remaining,
  filter,
  setFilter,
  clearCompleted,
  hasCompleted
}: Props) {
  return (
    <div className="flex justify-between items-center p-4 border-t border-neutral-100 text-sm text-gray-600">
      <span>
        {remaining} {remaining === 1 ? 'item' : 'items'} left
      </span>

      <ul className="flex gap-2">
        {filters.map(f => (
          <li key={f}>
            <button
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded ${
                filter === f ? 'border-1 border-indigo-400' : ''
              } hover:ring-1 hover:ring-indigo-400`}
            >
              {f}
            </button>
          </li>
        ))}
      </ul>

      {hasCompleted && (
        <button
          onClick={clearCompleted}
          className="hover:underline"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
