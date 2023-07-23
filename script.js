let taskList = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const reminderInput = document.getElementById("reminderInput");
  const task = taskInput.value.trim();
  const reminder = reminderInput.value.trim();

  if (task === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = {
    task: task,
    reminder: reminder,
    complete: false,
  };

  taskList.push(newTask);
  taskInput.value = "";
  reminderInput.value = "";
  saveTaskListToLocalStorage();
  displayTasks();
}

function toggleComplete(index) {
  taskList[index].complete = !taskList[index].complete;
  saveTaskListToLocalStorage();
  displayTasks();
}

function editTask(index) {
  taskList[index].editing = true;
  displayTasks();
}

function saveTask(index) {
  const taskInput = document.getElementById(`taskInput-${index}`);
  const reminderInput = document.getElementById(`reminderInput-${index}`);
  const task = taskInput.value.trim();
  const reminder = reminderInput.value.trim();

  if (task === "") {
    alert("Please enter a task.");
    return;
  }

  taskList[index].task = task;
  taskList[index].reminder = reminder;
  taskList[index].editing = false;
  saveTaskListToLocalStorage();
  displayTasks();
}

function cancelEdit(index) {
  taskList[index].editing = false;
  displayTasks();
}

function removeTask(index) {
  taskList.splice(index, 1);
  saveTaskListToLocalStorage();
  displayTasks();
}

function filterTasks() {
  const filterSelect = document.getElementById("filterSelect");
  const filterValue = filterSelect.value;
  let filteredTasks = [];

  if (filterValue === "done") {
    filteredTasks = taskList.filter((task) => task.complete);
  } else if (filterValue === "pending") {
    filteredTasks = taskList.filter((task) => !task.complete);
  } else {
    filteredTasks = taskList;
  }

  displayTasks(filteredTasks);
}

function displayTasks(tasks = taskList) {
  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = task.complete ? "complete" : "";
    listItem.className += task.editing ? " editing" : "";

    const taskText = document.createElement("span");
    taskText.innerText = task.task;

    const reminderText = document.createElement("span");
    reminderText.innerText = task.reminder;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.complete;
    checkbox.onchange = () => toggleComplete(index);

    const editBtn = document.createElement("button");
    editBtn.className = "editBtn";
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editTask(index);

    const saveBtn = document.createElement("button");
    saveBtn.className = "saveBtn";
    saveBtn.innerText = "Save";
    saveBtn.onclick = () => saveTask(index);

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "cancelBtn";
    cancelBtn.innerText = "Cancel";
    cancelBtn.onclick = () => cancelEdit(index);

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.onclick = () => removeTask(index);

    listItem.appendChild(taskText);
    listItem.appendChild(reminderText);
    listItem.appendChild(checkbox);

    if (task.editing) {
      const taskInput = document.createElement("input");
      taskInput.type = "text";
      taskInput.id = `taskInput-${index}`;
      taskInput.value = task.task;

      const reminderInput = document.createElement("input");
      reminderInput.type = "text";
      reminderInput.id = `reminderInput-${index}`;
      reminderInput.value = task.reminder;

      listItem.appendChild(taskInput);
      listItem.appendChild(reminderInput);
      listItem.appendChild(saveBtn);
      listItem.appendChild(cancelBtn);
    } else {
      listItem.appendChild(editBtn);
      listItem.appendChild(removeBtn);
    }

    taskListElement.appendChild(listItem);
  });
}

function loadTaskListFromLocalStorage() {
  const savedTaskList = localStorage.getItem("taskList");
  if (savedTaskList) {
    taskList = JSON.parse(savedTaskList);
  }
}

function saveTaskListToLocalStorage() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

loadTaskListFromLocalStorage();
displayTasks();
