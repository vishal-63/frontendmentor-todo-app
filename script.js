const bgImg = document.querySelector(".bg-img");
const bgColor = document.querySelector(".bg-color");
const toggleThemeBtn = document.querySelector(".toggle-theme");
const newTodoTextarea = document.querySelector("#new-todo-text");
const todoList = document.querySelector("ul");
const todoFooter = document.querySelector(".todo-footer");
const clearCompleted = document.querySelector(".clear-completed");
const itemsLeftDiv = document.querySelector(".items-left");
const tabsContainer = document.querySelector(".tabs-container");
const allTab = document.querySelector(".all-items");
const activeTab = document.querySelector(".active-items");
const completedTab = document.querySelector(".completed-items");

const toggleTheme = () => {
  bgImg.classList.toggle("dark-bg");
  bgImg.classList.toggle("light-bg");
  bgColor.classList.toggle("dark-color");
  bgColor.classList.toggle("light-color");
  toggleThemeBtn.classList.toggle("toggle-light");
  toggleThemeBtn.classList.toggle("toggle-dark");
};
toggleThemeBtn.addEventListener("click", toggleTheme);

newTodoTextarea.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault;
    addNewItem();
  }
});
const newCheckBox = document.querySelector(".checkbox-container input");
newCheckBox.addEventListener("change", () => addNewItem());

const handleTaskCounter = () => {
  let allTasks = document.querySelectorAll(".task");
  let completedTasks = document.querySelectorAll(".completed-task");
  let tasksLeft = allTasks.length - completedTasks.length;
  itemsLeftDiv.textContent = `${tasksLeft} items left`;
};

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
    // let del = document.querySelector(".delete-icon");
    // let deleteIcon = del.cloneNode(true);
    // newItem.appendChild(deleteIcon);
    todoList.appendChild(newItem);
    newTodoTextarea.value = "";
    todoFooter.style.display = "flex";
    tabsContainer.style.visibility = "visible";
    handleTaskCounter();
  }
  newCheckBox.checked = false;
};

const todoContainer = document.querySelector(".todo-items");
todoContainer.addEventListener("click", (e) => {
  // mark item complete
  let path = e.path[2];
  let selectedTask = path.childNodes[1];
  if (e.target.classList.contains("checkmark")) {
    if (selectedTask.classList.contains("completed")) {
      selectedTask.classList.remove("completed");
      path.classList.remove("completed-task");
      handleTaskCounter();
    } else {
      selectedTask.classList.add("completed");
      path.classList.add("completed-task");
      handleTaskCounter();
    }
  }

  //delete todo item
  if (e.target.classList.contains("delete-icon")) {
    e.path[1].remove();
    handleTaskCounter();
    if (document.querySelectorAll(".todo-title").length === 0)
      todoFooter.style.display = "none";
    tabsContainer.style.visibility = "hidden";
  }
});

// clear all completed tasks
clearCompleted.addEventListener("click", () => {
  let completedTasks = document.querySelectorAll(".completed-task");
  completedTasks.forEach((el) => el.remove());
});

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
    console.log(el);
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
