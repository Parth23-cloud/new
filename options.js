```javascript
let tasks = [];

function loadTasks() {
    chrome.storage.sync.get('tasks', function(data) {
        if (data.tasks) {
            tasks = data.tasks;
            displayTasks();
        }
    });
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(function(task) {
        const taskElement = document.createElement('li');
        taskElement.textContent = task.description;
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskList.appendChild(taskElement);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = {
        id: new Date().getTime(),
        description: taskInput.value,
        completed: false,
        timestamp: new Date()
    };
    tasks.push(newTask);
    chrome.storage.sync.set({tasks: tasks}, function() {
        loadTasks();
    });
    taskInput.value = '';
}

function completeTask(taskId) {
    tasks = tasks.map(function(task) {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    chrome.storage.sync.set({tasks: tasks}, function() {
        loadTasks();
    });
}

document.getElementById('addTaskButton').addEventListener('click', addTask);

loadTasks();
```