import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import { useTodo } from './features/todos/useTodo';

export default function App() {
  const {
    todos,
    allTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
    clearCompleted,
    remaining,
    hasCompleted
  } = useTodo();

  console.log(allTodos)

  return (
    <div className="mt-10 mx-auto max-w-[550px]">
      <h1 className="mb-10 text-7xl font-extralight text-center">todos</h1>
      
      <div className='shadow-lg'>
        <TodoInput onAdd={addTodo} />

        {allTodos.length > 0 && 
          <>
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />

            <TodoFooter
              remaining={remaining}
              filter={filter}
              setFilter={setFilter}
              clearCompleted={clearCompleted}
              hasCompleted={hasCompleted}
            />
          </>
        }
      </div>
    </div>
  );
}
