import React, { useState } from "react";

export default function Hero() {
  const [, setIsChecked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCheckboxChange = (event) => {
    const newCheckedState = event.target.checked;
    setIsChecked(newCheckedState);

    if (newCheckedState === true) {
      document.getElementById("todolist").style.textDecoration = "line-through";
      document.getElementById("todolist").style.color =
        "var(--DarkGrayishBlue)";
    } else {
      document.getElementById("todolist").style.textDecoration = "none";
      document.getElementById("todolist").style.color =
        "var(--VeryDarkGrayishBlue1)";
    }
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

  return (
    <div className={`container ${!isDarkMode ? "light-mode" : "dark-mode"}`}>
      <header id="header">
        <div id="head">
          <h1>TODO</h1>
          <img
            id="dark_mode"
            onClick={handleModeToggle}
            src={!isDarkMode ? "/assets/icon-sun.svg" : "/assets/icon-moon.svg"}
            alt={!isDarkMode ? "light_mode" : "dark_mode"}
          />
        </div>
        <label className="input">
          <input id="input" placeholder="Create a new todo..." />
        </label>
      </header>
      <div id="list-container">
        <label id="list" onChange={handleCheckboxChange}>
          <div className="todo">
            <input className="checkbox" type="checkbox" />
            <p id="todolist">Complete Todo App on Frontend Mentor</p>
          </div>
          <img
            src="/assets/icon-cross.svg
          "
            alt="close"
          />
        </label>
        <div className="items">
          <p>5 items left</p>
          <p>Clear Completed</p>
        </div>
      </div>
      <div id="tabs">
        <p className="current">All</p>
        <p>Active</p>
        <p>Completed</p>
      </div>
      <p className="hint">Drag and drop to reorder list</p>
    </div>
  );
}
