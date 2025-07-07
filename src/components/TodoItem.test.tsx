import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from './TodoItem';
import type { Item } from '../features/todos/types';

const todo: Item = {
  id: 1,
  text: 'Тестовая задача',
  completed: false,
};

describe('TodoItem', () => {
  it('рендерит текст задачи', () => {
    render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  it('отмечает чекбокс, если задача выполнена', () => {
    render(<TodoItem todo={{ ...todo, completed: true }} onToggle={() => {}} onDelete={() => {}} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('вызывает onToggle при клике на чекбокс', () => {
    const onToggle = vi.fn();
    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith(todo.id);
  });

  it('вызывает onDelete при клике на кнопку удаления', () => {
    const onDelete = vi.fn();
    render(<TodoItem todo={todo} onToggle={() => {}} onDelete={onDelete} />);
    const button = screen.getByRole('button', { name: /delete todo/i });
    fireEvent.click(button);
    expect(onDelete).toHaveBeenCalledWith(todo.id);
  });

  it('применяет класс line-through для выполненной задачи', () => {
    render(<TodoItem todo={{ ...todo, completed: true }} onToggle={() => {}} onDelete={() => {}} />);
    const textSpan = screen.getByText('Тестовая задача');
    expect(textSpan).toHaveClass('line-through');
  });
});
