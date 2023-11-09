import React, { useState, useEffect } from "react";

export default function Hero() {
  const [todos, setTodos] = useState([]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  const [lightModeImageSrc, setLightModeImageSrc] = useState("");

  const [listStyle, setListStyle] = useState({
    borderBottomColor: "var(--LightGrayishBlue)",
  });

  const [originalTodos, setOriginalTodos] = useState([]);

  const [activeFilter, setActiveFilter] = useState("all");

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setOriginalTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const setDeviceImage = () => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      if (isMobile) {
        // Set the mobile image source for smaller screens
        setLightModeImageSrc(
          isDarkMode
            ? "/assets/bg-mobile-dark.jpg"
            : "/assets/bg-mobile-light.jpg"
        );
      } else {
        // Set the desktop image source for larger screens
        setLightModeImageSrc(
          isDarkMode
            ? "/assets/bg-desktop-dark.jpg"
            : "/assets/bg-desktop-light.jpg"
        );
      }
    };

    setDeviceImage();
    window.addEventListener("resize", setDeviceImage);

    return () => {
      window.removeEventListener("resize", setDeviceImage);
    };
  }, [isDarkMode]);

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

    // const newLightModeImageSrc = isDarkMode
    //   ? "/assets/bg-mobile-light.jpg"
    //   : "/assets/bg-mobile-dark.jpg";
    // setLightModeImageSrc(newLightModeImageSrc);

    const inputStyle = {
      backgroundColor: updatedIsDarkMode ? "hsl(235, 24%, 19%)" : "white",
      color: updatedIsDarkMode ? "var(--DarkGrayishBlue)" : "black",
    };

    const tabsStyle = {
      backgroundColor: updatedIsDarkMode ? "hsl(235, 24%, 19%)" : "white",
    };

    setListStyle({
      borderBottomColor: updatedIsDarkMode
        ? "var(--DarkGrayishBlue)"
        : "var(--LightGrayishBlue)",
    });

    document.getElementById("body").style.backgroundColor =
      bodyStyle.backgroundColor;

    document.getElementById("list-container").style.backgroundColor =
      listContainerStyle.backgroundColor;

    document.getElementById("list-container").style.color =
      listContainerStyle.color;

    document.getElementById("input").style.backgroundColor =
      inputStyle.backgroundColor;

    document.getElementById("input").style.color = inputStyle.color;

    document.getElementById("tabs").style.backgroundColor =
      tabsStyle.backgroundColor;
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: originalTodos.length + 1,
        text: newTodo,
        isCompleted: false,
      };
      setOriginalTodos([...originalTodos, newTodoItem]);
      setTodos([...originalTodos, newTodoItem]); // Update displayed todos list
      setNewTodo("");
    }
  };

  // TO CLEAR COMPLETED TODO
  const clearTodo = () => {
    const filteredTodos = originalTodos.filter((todo) => !todo.isCompleted);
    setOriginalTodos(filteredTodos); // Update original todos list
    setTodos(filteredTodos); // Update displayed todos list
  };

  // TO SORT ACTIVE TODO
  const active = () => {
    setActiveFilter("active");
    const activeTodos = originalTodos.filter((todo) => !todo.isCompleted);
    setTodos(activeTodos); // Update displayed todos list
  };

  // TO SORT COMPLETED TODO
  const completed = () => {
    setActiveFilter("completed");
    const completedTodos = originalTodos.filter((todo) => todo.isCompleted);
    setTodos(completedTodos); // Update displayed todos list
  };

  // TO SHOW ALL TODOS AFTER SORTING
  const showAll = () => {
    setActiveFilter("all");
    setTodos(originalTodos); // Show all todos
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className={`container ${!isDarkMode ? "light-mode" : "dark-mode"}`}>
        <img
          id="mode_img"
          src={lightModeImageSrc}
          alt={!isDarkMode ? "light_mode" : "dark_mode"}
        />
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
          <label key={todo.id} id="list" style={listStyle}>
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
              id="remove"
              src="/assets/icon-cross.svg
          "
              alt="close"
              onClick={() => handleRemoveTodo(todo.id)}
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
        <p
          className={`current ${activeFilter === "all" && "active"}`}
          id="all"
          onClick={showAll}
        >
          All
        </p>
        <p
          className={activeFilter === "active" && "active"}
          id="active"
          onClick={active}
        >
          Active
        </p>
        <p
          className={activeFilter === "completed" && "active"}
          id="completed"
          onClick={completed}
        >
          Completed
        </p>
      </div>
      <p className="hint">Drag and drop to reorder list</p>
    </div>
  );
}
