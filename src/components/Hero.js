import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const [reorderedTodos, setReorderedTodos] = useState([]);

  // TO CREATE TODO
  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setOriginalTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  // TO TOGGLE MODE IMAGE
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

  // FOR TOGGLING MODES
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

    // Get the dark_mode element
    const darkModeImg = document.getElementById("dark_mode");

    // Toggle the rotate class to apply the animation effect
    darkModeImg.classList.toggle("rotate", !isDarkMode);
  };

  // HANDLES TODO INPUT
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  // HANDLES TODO LIST
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: uuidv4(),
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

  // REMOVES TODO ITEM
  const handleRemoveTodo = (id) => {
    setOriginalTodos((prevOriginalTodos) => {
      const updatedOriginalTodos = prevOriginalTodos.filter(
        (todo) => todo.id !== id
      );
      setTodos(updatedOriginalTodos); // Update displayed todos list
      return updatedOriginalTodos;
    });
  };

  // HANDLES DRAG, DROP AND LIST REORDER
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedOriginalTodos = Array.from(originalTodos);
    const [removed] = updatedOriginalTodos.splice(result.source.index, 1);
    updatedOriginalTodos.splice(result.destination.index, 0, removed);

    setOriginalTodos(updatedOriginalTodos);
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
            className={`dark-mode-toggle ${isDarkMode ? "rotate" : ""}`}
            onClick={handleModeToggle}
            src={!isDarkMode ? "/assets/icon-moon.svg" : "/assets/icon-sun.svg"}
            alt={!isDarkMode ? "light_mode" : "dark_mode"}
          />
        </div>

        {/* INPUT TODO */}
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <div
              className="characters"
              id="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id.toString()}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <label
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      id="list"
                      // style={listStyle}
                      style={{
                        ...listStyle,
                        backgroundColor:
                          provided.snapshot && provided.snapshot.isDragging
                            ? "red"
                            : listStyle.backgroundColor,
                      }}
                    >
                      <div className="todo">
                        <input
                          className="checkbox"
                          type="checkbox"
                          onChange={() => handleCheckboxChange(todo.id)}
                          checked={todo.isCompleted}
                        />
                        <p
                          style={{
                            textDecoration: todo.isCompleted
                              ? "line-through"
                              : "none",
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
                  )}
                </Draggable>
              ))}
              <div className="items">
                <p>
                  {todos.filter((todo) => !todo.isCompleted).length} items left
                </p>
                <p id="clear" onClick={clearTodo}>
                  Clear Completed
                </p>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div id="tabs">
        <p
          className={`tab ${activeFilter === "all" ? "current" : ""}`}
          id="all"
          onClick={() => {
            showAll();
            setActiveFilter("all");
          }}
        >
          All
        </p>
        <p
          className={`tab ${activeFilter === "active" ? "current" : ""}`}
          id="active"
          onClick={() => {
            active();
            setActiveFilter("active");
          }}
        >
          Active
        </p>
        <p
          className={`tab ${activeFilter === "completed" ? "current" : ""}`}
          id="completed"
          onClick={() => {
            completed();
            setActiveFilter("completed");
          }}
        >
          Completed
        </p>
      </div>
      <p className="hint">Drag and drop to reorder list</p>
    </div>
  );
}
