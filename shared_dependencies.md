Shared Dependencies:

1. Exported Variables:
   - `comments`: An array to store the comments for each webpage.
   - `tasks`: An array to store the tasks.

2. Data Schemas:
   - `CommentSchema`: Defines the structure of a comment with properties like `id`, `text`, `url`, and `timestamp`.
   - `TaskSchema`: Defines the structure of a task with properties like `id`, `description`, `completed`, and `timestamp`.

3. ID Names of DOM Elements:
   - `commentInput`: The input field for adding new comments.
   - `taskInput`: The input field for adding new tasks.
   - `commentList`: The container for displaying the list of comments.
   - `taskList`: The container for displaying the list of tasks.
   - `saveCommentButton`: The button for saving a new comment.
   - `addTaskButton`: The button for adding a new task.

4. Message Names:
   - `SAVE_COMMENT`: Message name for saving a new comment.
   - `ADD_TASK`: Message name for adding a new task.
   - `COMPLETE_TASK`: Message name for marking a task as completed.

5. Function Names:
   - `saveComment()`: Function to save a new comment.
   - `addTask()`: Function to add a new task.
   - `completeTask()`: Function to mark a task as completed.
   - `loadComments()`: Function to load comments for the current webpage.
   - `loadTasks()`: Function to load tasks.
   - `init()`: Function to initialize the extension.