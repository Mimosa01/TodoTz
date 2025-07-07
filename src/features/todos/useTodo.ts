import { useEffect, useState } from 'react';
import type { Filter, Item } from './types';

interface UseTodoReturn {
  todos: Item[];
  allTodos: Item[];
  addTodo: (text: string, id?: number) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  remaining: number;
  hasCompleted: boolean;
}

export function useTodo(): UseTodoReturn {
  const [todos, setTodos] = useState<Item[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) as Item[] : [];
  });

  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, id: number = Date.now()) => {
    const newTodo: Item = {
      id,
      text,
      completed: false,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  const remaining = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return {
    todos: filteredTodos,
    allTodos: todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filter,
    setFilter,
    remaining,
    hasCompleted,
  };
}
