// localStorageUtils.js
export const getStoredTodos = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
  return storedTodos;
};

export const updateLocalStorage = (todos) => {
  localStorage.setItem("todoList", JSON.stringify(todos));
};
