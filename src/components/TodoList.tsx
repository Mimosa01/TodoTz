import TodoItem from './TodoItem';
import type { Item } from '../features/todos/types';

type Props = {
  todos: Item[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoList ({ todos, onToggle, onDelete }: Props) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
