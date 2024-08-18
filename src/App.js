import React, { useState, useEffect } from "react";
import "./App.css";
import logo from './assets/logo.png';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({
    topic: '',
    body: '',
    checked: false,
    type: 'note'
  });
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    // Load saved todos from local storage on component mount
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (currentTodo.topic.trim() === '') return; // Prevent saving empty topics
    // Add current todo to the list and reset the current todo
    setTodos([...todos, currentTodo]);
    setCurrentTodo({ topic: '', body: '', checked: false, type: 'note' });
    setShowSaveButton(false); // Hide the save button after saving
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
    setShowSaveButton(true); // Show the save button when the user starts typing
  };

  const handleCheckboxChange = () => {
    setCurrentTodo({ ...currentTodo, checked: !currentTodo.checked });
  };

  const handleSaveKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter
      handleAddTodo(); // Save the to-do item
    }
  };

  return (
    <>
      <div className="side-panel">
        <div className="logo">
          <img src={logo} alt="Logo"></img>
        </div>

        <div className="search-bar">
          <input
            type="search"
            placeholder="Search"
            onChange={() => {}}
          ></input>
        </div>

        <div className="to-do-container">
          {todos.map((todo, index) => (
            <div key={index} className="to-do-card">
              <h3>{todo.topic}</h3>
              {todo.type === 'checkbox' && (
                <input
                  type="checkbox"
                  checked={todo.checked}
                  readOnly
                />
              )}
            </div>
          ))}
        </div>

        <div className="footer-items"></div>
      </div>

      <div className="container">
        <div className="topic-container">
          <input
            className="content-topic"
            name="topic"
            onChange={handleChange}
            value={currentTodo.topic}
            placeholder="New Topic"
          ></input>
        </div>

        <div className="body-container">
          <form className="add-todo-form" onKeyPress={handleSaveKeyPress}>
            <select
              name="type"
              className="todo-type-dropdown"
              value={currentTodo.type}
              onChange={handleChange}
            >
              <option value="note">Note</option>
              <option value="checkbox">Checkbox</option>
            </select>
            {currentTodo.type === 'checkbox' && (
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={currentTodo.checked}
                onChange={handleCheckboxChange}
              />
            )}
            <textarea
              name="body"
              placeholder="Add details..."
              className="new-todo-input"
              value={currentTodo.body}
              onChange={handleChange}
            />
          </form>
        </div>
        {showSaveButton && (
          <button className="save-button" onClick={handleAddTodo}>Save</button>
        )}
      </div>

      <div className="floating-button">
        <button className="add-todo-btn" onClick={handleAddTodo}>+</button>
      </div>
    </>
  );
};

export default App;
