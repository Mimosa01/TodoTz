import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoFooter from './TodoFooter';
import type { Filter } from '../features/todos/types';

describe('TodoFooter', () => {
  const defaultProps = {
    remaining: 2,
    filter: 'All' as Filter,
    setFilter: vi.fn(),
    clearCompleted: vi.fn(),
    hasCompleted: true,
  };

  it('отображает правильное количество оставшихся элементов', () => {
    render(<TodoFooter {...defaultProps} remaining={1} />);
    expect(screen.getByText('1 item left')).toBeInTheDocument();

    render(<TodoFooter {...defaultProps} remaining={3} />);
    expect(screen.getByText('3 items left')).toBeInTheDocument();
  });

  it('рендерит все фильтры и подсвечивает активный', () => {
    render(<TodoFooter {...defaultProps} filter="Active" />);
    const buttons = screen.getAllByRole('button', { name: /All|Active|Completed/ });

    expect(buttons).toHaveLength(3);
    expect(buttons.find(btn => btn.textContent === 'Active')).toHaveClass('border-1');
  });

  it('вызывает setFilter при клике на кнопку фильтра', () => {
    const setFilter = vi.fn();
    render(<TodoFooter {...defaultProps} setFilter={setFilter} />);

    const activeButton = screen.getByRole('button', { name: 'Active' });
    fireEvent.click(activeButton);
    expect(setFilter).toHaveBeenCalledWith('Active');
  });

  it('рендерит кнопку "Clear completed" если есть выполненные задачи и вызывает clearCompleted при клике', () => {
    const clearCompleted = vi.fn();
    render(<TodoFooter {...defaultProps} hasCompleted={true} clearCompleted={clearCompleted} />);

    const clearButton = screen.getByRole('button', { name: /clear completed/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(clearCompleted).toHaveBeenCalled();
  });

  it('не отображает кнопку "Clear completed" если нет выполненных задач', () => {
    render(<TodoFooter {...defaultProps} hasCompleted={false} />);
    expect(screen.queryByRole('button', { name: /clear completed/i })).toBeNull();
  });
});
