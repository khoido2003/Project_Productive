export default function TabFinished({ finished, dispatch }) {
  function handleDragOver(event) {
    // Prevent default to allow the drop
    event.preventDefault();
  }

  // Drag and Drop function
  function handleDrop(event) {
    // Get the task id from the data transferred during the drag
    const taskId = event.dataTransfer.getData("task");

    // Check if the task is coming from the "On Progress" tab or the "To Do" tab
    const sourceTab = event.dataTransfer.getData("sourceTab");

    // Dispatch the appropriate action based on the sourceTab
    if (sourceTab === "onProgress") {
      dispatch({ type: "progressMoveToFinished", payload: taskId });
    } else if (sourceTab === "todo") {
      dispatch({ type: "toDoMoveToFinished", payload: taskId });
    }
  }

  return (
    <div
      className="tab tab-finished"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h4>Finished</h4>

      <div className="task-container">
        {finished.map((task, i) => (
          <Task task={task} key={i} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}

function Task({ task, dispatch }) {
  const { id, taskName, header, description, backgroundColor } = task;

  function handleDragStart(event) {
    event.dataTransfer.setData("task", id);
    event.dataTransfer.setData("sourceTab", "finished"); // or "onProgress" depending on the source
  }

  function handleRemoveFinished() {
    dispatch({ type: "removeFinished", payload: id });
  }

  return (
    <div
      className={`task task-finished`}
      draggable // Make the task draggable
      onDragStart={handleDragStart} // Handle drag start event
    >
      <button
        className="btn-close btn-close-finished"
        onClick={handleRemoveFinished}
      >
        x
      </button>
      <h5>{taskName}</h5>
      <p className="task-title">{header}</p>

      <p className="task-description">{description}</p>
    </div>
  );
}
