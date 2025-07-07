import { render, screen, fireEvent } from '@testing-library/react';
import type { Item } from '../features/todos/types';
import TodoList from './TodoList';
import { vi } from 'vitest';

const todos: Item[] = [
  { id: 1, text: 'Задача 1', completed: false },
  { id: 2, text: 'Задача 2', completed: true },
];

describe('TodoList', () => {
  it('рендерит список задач', () => {
    render(
      <TodoList
        todos={todos}
        onToggle={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
  });

  it('вызывает onToggle при клике на чекбокс', () => {
    const onToggle = vi.fn();

    render(
      <TodoList
        todos={todos}
        onToggle={onToggle}
        onDelete={() => {}}
      />
    );

    // Предположим, что чекбоксы имеют роль checkbox, ищем первый
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it('вызывает onDelete при клике на кнопку удаления', () => {
    const onDelete = vi.fn();

    render(
      <TodoList
        todos={todos}
        onToggle={() => {}}
        onDelete={onDelete}
      />
    );

    // Предположим, что в TodoItem кнопка удаления имеет aria-label="delete todo"
    const deleteButtons = screen.getAllByRole('button', { name: /delete todo/i });
    fireEvent.click(deleteButtons[0]);

    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
