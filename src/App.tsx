import React, { useState, KeyboardEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { addTodo, toggleTodo, deleteTodo, clearCompleted } from './store';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className="app-container">
      <h1 className="app-title">TO<span>DO</span></h1>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="What do you need to do?"
        />
        <button onClick={handleAddTodo}>ADD</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
            </label>
            <button className="delete-btn" onClick={() => dispatch(deleteTodo(todo.id))}>×</button>
          </li>
        ))}
      </ul>
      <button className="clear-completed" onClick={handleClearCompleted}>Clear Completed</button>
    </div>
  );
}

export default App;
