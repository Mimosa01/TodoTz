import { renderHook, act } from '@testing-library/react';
import { useTodo } from './useTodo';

describe('useTodo hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('начинается с пустого списка', () => {
    const { result } = renderHook(() => useTodo());
    expect(result.current.allTodos).toEqual([]);
  });

  it('добавляет новую задачу', () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo('Новая задача');
    });

    expect(result.current.allTodos.length).toBe(1);
    expect(result.current.allTodos[0].text).toBe('Новая задача');
    expect(result.current.allTodos[0].completed).toBe(false);
  });

  it('переключает статус задачи', () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo('Задача для переключения');
    });

    const id = result.current.allTodos[0].id;

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.allTodos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.allTodos[0].completed).toBe(false);
  });

  it('удаляет задачу', () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo('Задача для удаления');
    });

    const id = result.current.allTodos[0].id;

    act(() => {
      result.current.deleteTodo(id);
    });

    expect(result.current.allTodos.length).toBe(0);
  });

  it('очищает завершённые задачи', () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo('task 1', 1);
      result.current.addTodo('task 2', 2);
    });

    act(() => {
      result.current.toggleTodo(1);
    });

    act(() => {
      result.current.clearCompleted();
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].text).toBe('task 2');
    expect(result.current.todos[0].completed).toBe(false);
  });
});
