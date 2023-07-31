```javascript
let comments = [];
let tasks = [];

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('saveCommentButton').addEventListener('click', saveComment);
    document.getElementById('addTaskButton').addEventListener('click', addTask);
    loadComments();
    loadTasks();
}

function saveComment() {
    let commentInput = document.getElementById('commentInput');
    let comment = {
        id: Date.now(),
        text: commentInput.value,
        url: window.location.href,
        timestamp: new Date().toISOString()
    };
    comments.push(comment);
    chrome.runtime.sendMessage({ type: 'SAVE_COMMENT', payload: comment });
    commentInput.value = '';
    loadComments();
}

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let task = {
        id: Date.now(),
        description: taskInput.value,
        completed: false,
        timestamp: new Date().toISOString()
    };
    tasks.push(task);
    chrome.runtime.sendMessage({ type: 'ADD_TASK', payload: task });
    taskInput.value = '';
    loadTasks();
}

function completeTask(id) {
    let task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = true;
        chrome.runtime.sendMessage({ type: 'COMPLETE_TASK', payload: task });
        loadTasks();
    }
}

function loadComments() {
    let commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(comment => {
        let li = document.createElement('li');
        li.textContent = comment.text;
        commentList.appendChild(li);
    });
}

function loadTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.description;
        if (task.completed) {
            li.style.textDecoration = 'line-through';
        } else {
            li.addEventListener('click', () => completeTask(task.id));
        }
        taskList.appendChild(li);
    });
}
```