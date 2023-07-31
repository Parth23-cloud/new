```javascript
let comments = [];
let tasks = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'SAVE_COMMENT') {
        saveComment(request.data);
    } else if (request.message === 'ADD_TASK') {
        addTask(request.data);
    } else if (request.message === 'COMPLETE_TASK') {
        completeTask(request.data);
    }
});

function saveComment(data) {
    comments.push(data);
    chrome.storage.sync.set({comments: comments}, function() {
        console.log('Comment saved');
    });
}

function addTask(data) {
    tasks.push(data);
    chrome.storage.sync.set({tasks: tasks}, function() {
        console.log('Task added');
    });
}

function completeTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });
    chrome.storage.sync.set({tasks: tasks}, function() {
        console.log('Task completed');
    });
}

chrome.storage.sync.get(['comments', 'tasks'], function(result) {
    if (result.comments) {
        comments = result.comments;
    }
    if (result.tasks) {
        tasks = result.tasks;
    }
});
```