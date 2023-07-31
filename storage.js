```javascript
const comments = [];
const tasks = [];

const CommentSchema = {
  id: '',
  text: '',
  url: '',
  timestamp: ''
};

const TaskSchema = {
  id: '',
  description: '',
  completed: false,
  timestamp: ''
};

function saveComment(comment) {
  comments.push(comment);
  chrome.storage.sync.set({comments: comments}, function() {
    console.log('Comment saved');
  });
}

function addTask(task) {
  tasks.push(task);
  chrome.storage.sync.set({tasks: tasks}, function() {
    console.log('Task added');
  });
}

function completeTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = true;
    chrome.storage.sync.set({tasks: tasks}, function() {
      console.log('Task completed');
    });
  }
}

function loadComments(url) {
  chrome.storage.sync.get(['comments'], function(result) {
    return result.comments.filter(comment => comment.url === url);
  });
}

function loadTasks() {
  chrome.storage.sync.get(['tasks'], function(result) {
    return result.tasks;
  });
}

function init() {
  chrome.storage.sync.get(['comments', 'tasks'], function(result) {
    if (result.comments) {
      comments = result.comments;
    }
    if (result.tasks) {
      tasks = result.tasks;
    }
  });
}

init();
```