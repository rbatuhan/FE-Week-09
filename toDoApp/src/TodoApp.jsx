import React, { useState, useEffect } from 'react';
import './index.css';

function TodoApp() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const trimmedText = text.trim();
    if (trimmedText) {
      setTodos([...todos, { text: trimmedText, done: false }]);
      setNewTodo('');
    }
  };

  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={(e) => { e.preventDefault(); addTodo(newTodo); }}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            autoFocus
          />
        </form>
      </header>

      {todos.length > 0 && (
        <React.Fragment>
          <section className="main">
            <ul className="todo-list">
              {filteredTodos.map((todo, index) => (
                <li key={index} className={todo.done ? 'completed' : ''}>
                  <div className="view">
                    <input className="toggle" type="checkbox" checked={todo.done} onChange={() => toggleDone(index)} />
                    <label>{todo.text}</label>
                    <button className="destroy" onClick={() => deleteTodo(index)}></button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              {todos.filter(todo => !todo.done).length} items left
            </span>
            <ul className="filters">
              <li><button onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : ''}>All</button></li>
              <li><button onClick={() => setFilter('active')} className={filter === 'active' ? 'selected' : ''}>Active</button></li>
              <li><button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'selected' : ''}>Completed</button></li>
            </ul>
            <button className="clear-completed" onClick={clearCompleted}>
              Clear completed
            </button>
          </footer>
        </React.Fragment>
      )}
    </section>
  );
}

export default TodoApp;
