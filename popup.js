```javascript
let comments = {};
let currentURL = '';

document.getElementById('saveButton').addEventListener('click', saveComment);
document.getElementById('optionsButton').addEventListener('click', openOptions);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'LOAD_COMMENTS') {
    comments = request.comments;
    displayComments();
  }
});

function saveComment() {
  const commentInput = document.getElementById('commentInput');
  const comment = commentInput.value.trim();
  if (comment) {
    const timestamp = new Date().toISOString();
    if (!comments[currentURL]) {
      comments[currentURL] = [];
    }
    comments[currentURL].push({ comment, timestamp });
    chrome.runtime.sendMessage({ message: 'SAVE_COMMENT', url: currentURL, comments: comments[currentURL] });
    commentInput.value = '';
    displayComments();
  }
}

function displayComments() {
  const commentList = document.getElementById('commentList');
  commentList.innerHTML = '';
  if (comments[currentURL]) {
    comments[currentURL].forEach(commentObj => {
      const commentElement = document.createElement('li');
      commentElement.textContent = `${commentObj.comment} (${commentObj.timestamp})`;
      commentList.appendChild(commentElement);
    });
  }
}

function openOptions() {
  chrome.runtime.openOptionsPage();
}

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  currentURL = new URL(tabs[0].url).hostname;
  chrome.runtime.sendMessage({ message: 'LOAD_COMMENTS', url: currentURL });
});
```