```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ comments: [], tasks: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    chrome.storage.sync.get('comments', (data) => {
      const comments = data.comments;
      comments.push(request.payload);
      chrome.storage.sync.set({ comments: comments });
    });
  }

  if (request.message === 'ADD_TASK') {
    chrome.storage.sync.get('tasks', (data) => {
      const tasks = data.tasks;
      tasks.push(request.payload);
      chrome.storage.sync.set({ tasks: tasks });
    });
  }

  if (request.message === 'COMPLETE_TASK') {
    chrome.storage.sync.get('tasks', (data) => {
      const tasks = data.tasks;
      const taskIndex = tasks.findIndex(task => task.id === request.payload);
      if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        chrome.storage.sync.set({ tasks: tasks });
      }
    });
  }
});
```