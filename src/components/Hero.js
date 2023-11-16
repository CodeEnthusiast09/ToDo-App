import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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

  // State for the deferred install prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  // State to manage the visibility of the custom install prompt
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Effect to listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default behavior
      event.preventDefault();

      // Stash the event so it can be triggered later
      setDeferredPrompt(event);

      // Show the custom install prompt
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Function to handle the custom install prompt
  const handleInstallPrompt = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }

        // Reset deferredPrompt to null
        setDeferredPrompt(null);

        // Hide the custom install prompt
        setShowInstallPrompt(false);
      });
    }
  };

  // Function to update local storage with the latest todo list
  const updateLocalStorage = (updatedTodos) => {
    localStorage.setItem("todoList", JSON.stringify(updatedTodos));
  };

  // Effect to load todo list from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
    console.log("Retrieved todo list from local storage:", storedTodos);
    setOriginalTodos(storedTodos);
    setTodos(storedTodos);
  }, []);

  // Effect to update local storage whenever todos change
  useEffect(() => {
    console.log("Updating local storage with todo list:", originalTodos);
    updateLocalStorage(originalTodos);
  }, [originalTodos]);

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

    const installStyle = {
      backgroundColor: updatedIsDarkMode
        ? "var(----VeryDarkDesaturatedBlue)"
        : "var(--VeryLightGray)",
    };

    const dismissStyle = {
      backgroundColor: updatedIsDarkMode
        ? "var(----VeryDarkDesaturatedBlue)"
        : "var(--VeryLightGray)",
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

    document.getElementById("install").style.backgroundColor =
      installStyle.backgroundColor;

    document.getElementById("dismiss").style.backgroundColor =
      dismissStyle.backgroundColor;

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
      <div id="list-container">
        {todos.map((todo, index) => (
          <label id="list" style={listStyle} key={todo.id}>
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
      {showInstallPrompt && (
        <div className="install-prompt">
          <p>Install the app</p>
          <button id="install" onClick={handleInstallPrompt}>
            Install🤗
          </button>
          <button id="dismiss" onClick={() => setShowInstallPrompt(false)}>
            Dismiss😞
          </button>
        </div>
      )}
      <p className="hint">
        Coded by{" "}
        <a href="https://github.com/CodeEnthusiast09">𝕮𝖔𝖉𝖊𝕰𝖓𝖙𝖍𝖚𝖘𝖎𝖆𝖘𝖙 𝕴𝖃</a>
      </p>
    </div>
  );
}
