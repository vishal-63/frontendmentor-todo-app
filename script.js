const bgImg = document.querySelector(".bg-img");
const bgColor = document.querySelector(".bg-color");
const toggleThemeBtn = document.querySelector(".toggle-theme");
const createNewDiv = document.querySelector(".create-new");
const createNewCheck = document.querySelector(".create-new .checkmark");
const newTodoTextarea = document.querySelector(".new-todo-text");
const todoList = document.querySelector("ul");
const todoFooter = document.querySelector(".todo-footer");
const clearCompleted = document.querySelector(".clear-completed");
const itemsLeftDiv = document.querySelector(".items-left");
const tabsContainer = document.querySelector(".tabs-container");
const allTab = document.querySelector(".all-items");
const activeTab = document.querySelector(".active-items");
const completedTab = document.querySelector(".completed-items");

document.addEventListener("DOMcontentLoaded", getLocalTodos());

// toggle theme
let darkTheme = true;
const toggleTheme = () => {
  darkTheme = !darkTheme;
  if (darkTheme) {
    createNewDiv.classList.remove("light-theme");
    newTodoTextarea.classList.remove("light-theme");
    todoList.parentElement.classList.remove("light-theme");
    document
      .querySelectorAll(".todo-title")
      .forEach((el) => el.classList.remove("light-theme"));
    document
      .querySelectorAll(".checkmark")
      .forEach((el) => el.classList.remove("light-theme"));
    document
      .querySelectorAll("li")
      .forEach((el) => el.classList.remove("li-light-theme"));
    tabsContainer.classList.remove("light-theme");
    allTab.classList.remove("light-theme");
    activeTab.classList.remove("light-theme");
    completedTab.classList.remove("light-theme");
  } else {
    createNewDiv.classList.add("light-theme");
    newTodoTextarea.classList.add("light-theme");
    todoList.parentElement.classList.add("light-theme");
    document
      .querySelectorAll(".todo-title")
      .forEach((el) => el.classList.add("light-theme"));
    document
      .querySelectorAll(".checkmark")
      .forEach((el) => el.classList.add("light-theme"));
    document
      .querySelectorAll("li")
      .forEach((el) => el.classList.add("li-light-theme"));
    tabsContainer.classList.add("light-theme");
    allTab.classList.add("light-theme");
    activeTab.classList.add("light-theme");
    completedTab.classList.add("light-theme");
  }
  bgImg.classList.toggle("dark-bg");
  bgImg.classList.toggle("light-bg");
  bgColor.classList.toggle("dark-color");
  bgColor.classList.toggle("light-color");
  toggleThemeBtn.classList.toggle("toggle-light");
  toggleThemeBtn.classList.toggle("toggle-dark");
};
toggleThemeBtn.addEventListener("click", toggleTheme);

// add new item
newTodoTextarea.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault;
    addNewItem();
  }
});
const newCheckBox = document.querySelector(".checkbox-container input");
newCheckBox.addEventListener("change", () => addNewItem());

const addNewItem = () => {
  if (newTodoTextarea.value !== "") {
    //creates new list item and appends to the todo-list
    let newItem = document.createElement("li");
    newItem.className = "task";

    let liLabel = document.createElement("label");
    liLabel.className = "checkbox-container todo-item";

    let liLabelInput = document.createElement("input");
    liLabelInput.setAttribute("type", "checkbox");
    liLabelInput.className = "checkbox";

    let liLabelSpan = document.createElement("span");
    liLabelSpan.className = "checkmark";

    liLabel.appendChild(liLabelInput);
    liLabel.appendChild(liLabelSpan);

    let todoTitle = document.createElement("p");
    todoTitle.className = "todo-title";

    let todoDeleteItem = document.createElement("span");
    todoDeleteItem.className = "delete-icon";

    newItem.appendChild(liLabel);
    todoTitle.innerHTML = newTodoTextarea.value;

    newItem.appendChild(todoTitle);
    newItem.appendChild(todoDeleteItem);
    todoList.appendChild(newItem);
    saveLocalUncompletedTodos(todoTitle.innerHTML);
    newTodoTextarea.value = "";
    todoFooter.style.display = "flex";
    tabsContainer.style.visibility = "visible";
    handleTaskCounter();
  }
  newCheckBox.checked = false;
};

// handles number of items left counter
function handleTaskCounter() {
  let allTasks = document.querySelectorAll(".task");
  let completedTasks = document.querySelectorAll(".completed-task");
  let tasksLeft = allTasks.length - completedTasks.length;
  itemsLeftDiv.textContent = `${tasksLeft} items left`;
}

// detect click anywhere on the taskcontainer
const todoContainer = document.querySelector(".todo-items");
todoContainer.addEventListener("click", (e) => {
  // mark item complete if the click is on checkmark
  let path = e.path[2];
  let selectedTask = path.childNodes[1];
  if (e.target.classList.contains("checkmark")) {
    if (selectedTask.classList.contains("completed")) {
      selectedTask.classList.remove("completed");
      path.classList.remove("completed-task");
      saveLocalUncompletedTodos(selectedTask.textContent);
      removeLocalCompletedTodos(selectedTask.textContent);
    } else {
      selectedTask.classList.add("completed");
      path.classList.add("completed-task");
      saveLocalCompletedTodos(selectedTask.textContent);
      removeLocalUncompletedTodos(selectedTask.textContent);
    }
    handleTaskCounter();
  }

  //delete todo item if the click is on delete icon
  if (e.target.classList.contains("delete-icon")) {
    e.path[1].remove();

    const todo = e.path[1].childNodes[1].textContent;
    const completedTodosList = localStorage.getItem("completedTodos");
    const uncompletedTodosList = localStorage.getItem("uncompletedTodos");
    if (completedTodosList.includes(todo)) removeLocalCompletedTodos(todo);
    else if (uncompletedTodosList.includes(todo))
      removeLocalUncompletedTodos(todo);

    handleTaskCounter();
    if (document.querySelectorAll(".todo-title").length === 0) {
      todoFooter.style.display = "none";
      tabsContainer.style.visibility = "hidden";
    }
  }
});

// clear all completed tasks
clearCompleted.addEventListener("click", () => {
  let completedTasks = document.querySelectorAll(".completed-task");
  completedTasks.forEach((el) => {
    el.remove();
    removeLocalCompletedTodos(el.childNodes[1].textContent);
  });
});

// toggle to view b/w all or active or completed tasks
const toggleTab = () => {
  allTab.classList.toggle("active");
  activeTab.classList.toggle("active");
  completedTab.classList.toggle("active");
};

allTab.onclick = () => {
  allTab.classList.add("active");
  activeTab.classList.remove("active");
  completedTab.classList.remove("active");
  document.querySelectorAll(".task").forEach((el) => {
    el.style.display = "flex";
  });
};
activeTab.onclick = () => {
  allTab.classList.remove("active");
  activeTab.classList.add("active");
  completedTab.classList.remove("active");
  document.querySelectorAll(".task").forEach((el) => {
    el.classList.contains("completed-task")
      ? (el.style.display = "none")
      : (el.style.display = "flex");
  });
};
completedTab.onclick = () => {
  allTab.classList.remove("active");
  activeTab.classList.remove("active");
  completedTab.classList.add("active");
  document.querySelectorAll(".task").forEach((el) => {
    el.classList.contains("completed-task")
      ? (el.style.display = "flex")
      : (el.style.display = "none");
  });
};

// localstorage stuff
function saveLocalUncompletedTodos(todo) {
  let uncompletedTodos;
  if (localStorage.getItem("uncompletedTodos") === null) uncompletedTodos = [];
  else uncompletedTodos = JSON.parse(localStorage.getItem("uncompletedTodos"));

  if (!uncompletedTodos.includes(todo)) {
    uncompletedTodos.push(todo);
    localStorage.setItem("uncompletedTodos", JSON.stringify(uncompletedTodos));
  }
}

function saveLocalCompletedTodos(todo) {
  let completedTodos;
  if (localStorage.getItem("completedTodos") === null) completedTodos = [];
  else completedTodos = JSON.parse(localStorage.getItem("completedTodos"));

  if (!completedTodos.includes(todo)) {
    completedTodos.push(todo);
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }
}

function getLocalTodos() {
  const localUncompletedTodos = JSON.parse(
    localStorage.getItem("uncompletedTodos")
  );
  const localCompletedTodos = JSON.parse(
    localStorage.getItem("completedTodos")
  );
  console.log(localUncompletedTodos, localCompletedTodos);
  if (localUncompletedTodos !== null)
    setLocalUncompletedTodos(localUncompletedTodos);
  if (localCompletedTodos !== null) setLocalCompletedTodos(localCompletedTodos);
}

function setLocalUncompletedTodos(todos) {
  todos.forEach((todo) => {
    let newItem = document.createElement("li");
    newItem.className = "task";

    let liLabel = document.createElement("label");
    liLabel.className = "checkbox-container todo-item";

    let liLabelInput = document.createElement("input");
    liLabelInput.setAttribute("type", "checkbox");
    liLabelInput.className = "checkbox";

    let liLabelSpan = document.createElement("span");
    liLabelSpan.className = "checkmark";

    liLabel.appendChild(liLabelInput);
    liLabel.appendChild(liLabelSpan);

    let todoTitle = document.createElement("p");
    todoTitle.className = "todo-title";

    let todoDeleteItem = document.createElement("span");
    todoDeleteItem.className = "delete-icon";

    newItem.appendChild(liLabel);
    todoTitle.innerHTML = todo;
    newItem.appendChild(todoTitle);
    newItem.appendChild(todoDeleteItem);
    todoList.appendChild(newItem);
    newTodoTextarea.value = "";
    todoFooter.style.display = "flex";
    tabsContainer.style.visibility = "visible";
    handleTaskCounter();
  });
}

function setLocalCompletedTodos(todos) {
  todos.forEach((todo) => {
    let newItem = document.createElement("li");
    newItem.className = "task completed-task";

    let liLabel = document.createElement("label");
    liLabel.className = "checkbox-container todo-item";

    let liLabelInput = document.createElement("input");
    liLabelInput.setAttribute("type", "checkbox");
    liLabelInput.checked = true;
    liLabelInput.className = "checkbox";

    let liLabelSpan = document.createElement("span");
    liLabelSpan.className = "checkmark";

    liLabel.appendChild(liLabelInput);
    liLabel.appendChild(liLabelSpan);

    let todoTitle = document.createElement("p");
    todoTitle.className = "todo-title completed";

    let todoDeleteItem = document.createElement("span");
    todoDeleteItem.className = "delete-icon";

    newItem.appendChild(liLabel);
    todoTitle.innerHTML = todo;
    newItem.appendChild(todoTitle);
    newItem.appendChild(todoDeleteItem);
    todoList.appendChild(newItem);
    newTodoTextarea.value = "";
    todoFooter.style.display = "flex";
    tabsContainer.style.visibility = "visible";
    handleTaskCounter();
  });
}

function removeLocalUncompletedTodos(todo) {
  uncompletedTodos = JSON.parse(localStorage.getItem("uncompletedTodos"));
  let index = uncompletedTodos.indexOf(todo);
  uncompletedTodos.splice(index, 1);
  localStorage.setItem("uncompletedTodos", JSON.stringify(uncompletedTodos));
}

function removeLocalCompletedTodos(todo) {
  completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
  let index = completedTodos.indexOf(todo);
  completedTodos.splice(index, 1);
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
}
