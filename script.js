
const form = document.querySelector("form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("ul");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Display Tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task Text
        const span = document.createElement("span");
        span.textContent = task.text;

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Add New Task
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskValue,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
});

// Initial Display
displayTasks();
