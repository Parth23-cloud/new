```javascript
let comments = {};
let currentURL = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'LOAD_COMMENTS') {
    currentURL = request.url;
    loadComments();
  }
});

function loadComments() {
  chrome.storage.sync.get([currentURL], function(result) {
    if (result[currentURL]) {
      comments = result[currentURL];
    } else {
      comments = {};
    }
    chrome.runtime.sendMessage({message: 'DISPLAY_COMMENTS', comments: comments});
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    saveComment(request.comment);
  }
});

function saveComment(comment) {
  comments[Date.now()] = comment;
  let saveObj = {};
  saveObj[currentURL] = comments;
  chrome.storage.sync.set(saveObj, function() {
    chrome.runtime.sendMessage({message: 'DISPLAY_COMMENTS', comments: comments});
  });
}
```