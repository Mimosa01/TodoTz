import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoInput from './TodoInput';

describe('TodoInput', () => {
  it('рендерит input с пустым значением', () => {
    render(<TodoInput onAdd={() => {}} />);
    const input = screen.getByPlaceholderText(/whats need to be done\?/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('обновляет значение при вводе текста', () => {
    render(<TodoInput onAdd={() => {}} />);
    const input = screen.getByPlaceholderText(/whats need to be done\?/i);
    fireEvent.change(input, { target: { value: 'Новая задача' } });
    expect(input).toHaveValue('Новая задача');
  });

  it('вызывает onAdd с обрезанным текстом и очищает input при сабмите', () => {
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);
    const input = screen.getByPlaceholderText(/whats need to be done\?/i);
    
    // Вводим текст с пробелами по краям
    fireEvent.change(input, { target: { value: '  Задача  ' } });
    fireEvent.submit(input.closest('form')!);

    expect(onAdd).toHaveBeenCalledWith('Задача');
    expect(input).toHaveValue('');
  });

  it('не вызывает onAdd, если введен пустой или пробельный текст', () => {
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);
    const input = screen.getByPlaceholderText(/whats need to be done\?/i);

    fireEvent.change(input, { target: { value: '    ' } });
    fireEvent.submit(input.closest('form')!);

    expect(onAdd).not.toHaveBeenCalled();
  });
});
