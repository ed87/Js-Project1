const taskList = [];

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
  displayTasks();
}

function toggleComplete(index) {
  taskList[index].complete = !taskList[index].complete;
  displayTasks();
}

function removeTask(index) {
  taskList.splice(index, 1);
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

    const taskText = document.createElement("span");
    taskText.innerText = task.task;

    const reminderText = document.createElement("span");
    reminderText.innerText = task.reminder;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.complete;
    checkbox.onchange = () => toggleComplete(index);

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.onclick = () => removeTask(index);

    listItem.appendChild(taskText);
    listItem.appendChild(reminderText);
    listItem.appendChild(checkbox);
    listItem.appendChild(removeBtn);

    taskListElement.appendChild(listItem);
  });
}

displayTasks();
