const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const noData = document.querySelector(".no-data");

loadEventListeners();

function loadEventListeners() {
  // Dom Content Load
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add Task
  form.addEventListener("submit", addTask);
  // Remove Task
  taskList.addEventListener("click", removeTask);
  // Clear All Tasks
  clearBtn.addEventListener("click", clearAllTasks);
  // Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}

function addTask(e) {
  if (taskInput.value === "") {
    M.toast({ html: "Please add a task!", classes: "blue" });
  } else {
    // Create li
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a tag
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.style.cursor = "pointer";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    // Append to li
    li.appendChild(link);
    // Append to ul
    taskList.appendChild(li);

    SaveToLocalStorage(taskInput.value);

    // Make Input Blank
    taskInput.value = "";
    // Make Input Inactive
    const label = document.querySelector("#task-label");
    label.className = "";
  }
  e.preventDefault();
}

function SaveToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  noData.style.display = "none";
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    // Create a tag
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.style.cursor = "pointer";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    // Append to li
    li.appendChild(link);
    // Append to ul
    taskList.appendChild(li);
  });
}

function removeTask(e) {
  // Get Task Test;
  const text = e.target.parentElement.parentElement.textContent;
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      deleteFromLocalStorage(e.target.parentElement.parentElement);
      M.toast({
        html: ` ${text} task removed.`,
        classes: "red",
      });
    }
  }
}

function deleteFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks() {
  // taskList.innerHTML = "";
  //faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  filter.value = "";
  noData.style.display = "block";
  M.toast({
    html: "Tasks Cleared.",
    classes: "red",
  });

  clearAllTasksFromLocalStorage();
}

function clearAllTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
