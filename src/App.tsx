import React, { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (editId !== null) {
      // Update existing todo
      setTodos(todos.map(todo => 
        todo.id === editId ? { ...todo, text: inputValue } : todo
      ));
      setEditId(null);
    } else {
      // Add new todo
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
    setInputValue('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleEdit = (todo: Todo) => {
    setEditId(todo.id);
    setInputValue(todo.text);
  };

  return (
    <div className='flex h-screen w-full justify-center items-center bg-gray-100'>
      <div className='flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Todo App</h1>
        <form onSubmit={handleSubmit} className='flex mb-4'>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Add a task'
            className='flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type="submit"
            className='bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors'
          >
            {editId !== null ? 'Update' : 'Add'}
          </button>
        </form>
        
        <ul className='space-y-2'>
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`flex items-center p-3 border rounded ${todo.completed ? 'bg-gray-50' : 'bg-white'}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className='mr-3 h-5 w-5'
              />
              <span
                className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleEdit(todo)}
                className='text-yellow-500 hover:text-yellow-700 mr-2'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className='text-red-500 hover:text-red-700'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <div className='mt-4 text-sm text-gray-500'>
            {todos.filter(t => t.completed).length} of {todos.length} tasks completed
          </div>
        )}
      </div>
    </div>
  );
};

export default App;