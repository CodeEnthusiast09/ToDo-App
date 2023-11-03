import React, { useState } from "react";

export default function Hero() {
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const handleModeToggle = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);

    const updatedIsDarkMode = !isDarkMode;

    const bodyStyle = {
      backgroundColor: updatedIsDarkMode
        ? "var(--VeryDarkBlue)"
        : "var(--VeryLightGrayishBlue)",
    };

    const listContainerStyle = {
      backgroundColor: updatedIsDarkMode
        ? "var(--VeryDarkDesaturatedBlue)"
        : "white",
      color: isDarkMode ? "var(--DarkGrayishBlue)" : "var(--DarkGrayishBlue)",
    };

    const headerStyle = {
      backgroundImage: updatedIsDarkMode
        ? "url('/assets/bg-mobile-dark.jpg')"
        : "url('/assets/bg-mobile-light.jpg')",
      height: updatedIsDarkMode ? "200px" : "200px",
    };

    const inputStyle = {
      backgroundColor: updatedIsDarkMode ? "hsl(235, 24%, 19%)" : "white",
      color: updatedIsDarkMode ? "var(--DarkGrayishBlue)" : "black",
    };

    const tabsStyle = {
      backgroundColor: updatedIsDarkMode ? "hsl(235, 24%, 19%)" : "white",
    };

    const listStyle = {
      borderBottomColor: updatedIsDarkMode
        ? "var(--DarkGrayishBlue)"
        : "var(--LightGrayishBlue)",
    };

    document.getElementById("body").style.backgroundColor =
      bodyStyle.backgroundColor;

    document.getElementById("list-container").style.backgroundColor =
      listContainerStyle.backgroundColor;

    document.getElementById("list-container").style.color =
      listContainerStyle.color;

    document.getElementById("header").style.backgroundImage =
      headerStyle.backgroundImage;

    document.getElementById("header").style.height = headerStyle.height;

    document.getElementById("input").style.backgroundColor =
      inputStyle.backgroundColor;

    document.getElementById("input").style.color = inputStyle.color;

    document.getElementById("tabs").style.backgroundColor =
      tabsStyle.backgroundColor;

    document.getElementById("list").style.borderBottomColor =
      listStyle.borderBottomColor;
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: todos.length + 1,
        text: newTodo,
        isCompleted: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo(""); // Reset the input field after adding the to-do
    }
  };

  // TO CLEAR COMPLETED TODO ITEMS
  const clearTodo = () => {
    const filteredTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(filteredTodos);
  };

  // TO SORT ACTIVE TODO ITEMS
  const active = () => {
    const filteredTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(filteredTodos);
  };

  // TO SHOW COMPLETED TO DO LIST
  const completed = () => {
    const completedTodos = todos.filter((todo) => todo.isCompleted);
    setTodos(completedTodos);
  };

  return (
    <div className={`container ${!isDarkMode ? "light-mode" : "dark-mode"}`}>
      <header id="header">
        <div id="head">
          <h1>TODO</h1>
          <img
            id="dark_mode"
            onClick={handleModeToggle}
            src={!isDarkMode ? "/assets/icon-moon.svg" : "/assets/icon-sun.svg"}
            alt={!isDarkMode ? "light_mode" : "dark_mode"}
          />
        </div>
        <label className="input">
          <input
            id="input"
            placeholder="Create a new todo..."
            value={newTodo}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
        </label>
      </header>
      <div id="list-container">
        {todos.map((todo) => (
          <label key={todo.id} id="list">
            <div className="todo">
              <input
                className="checkbox"
                type="checkbox"
                onChange={() => handleCheckboxChange(todo.id)}
                checked={todo.isCompleted}
              />
              <p
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.text}
              </p>
            </div>
            <img
              src="/assets/icon-cross.svg
          "
              alt="close"
            />
          </label>
        ))}
        <div className="items">
          <p>{todos.filter((todo) => !todo.isCompleted).length} items left</p>
          <p id="clear" onClick={clearTodo}>
            Clear Completed
          </p>
        </div>
      </div>
      <div id="tabs">
        <p className="current">All</p>
        <p id="active" onClick={active}>
          Active
        </p>
        <p id="completed" onClick={completed}>
          Completed
        </p>
      </div>
      <p className="hint">Drag and drop to reorder list</p>
    </div>
  );
}
