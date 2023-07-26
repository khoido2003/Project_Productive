export default function TabOnProgress({ onProgress, dispatch }) {
  function handleDragOver(event) {
    // Prevent default to allow the drop
    event.preventDefault();
  }

  // Drag and Drop function
  function handleDrop(event) {
    // Get the task id from the data transferred during the drag
    const taskId = event.dataTransfer.getData("task");
    const sourceTab = event.dataTransfer.getData("sourceTab");
    // dispatch({ type: "toDoMoveToProgress", payload: taskId });

    if (sourceTab === "todo") {
      dispatch({ type: "toDoMoveToProgress", payload: taskId });
    } else if (sourceTab === "finished") {
      dispatch({ type: "finishedMoveToProgress", payload: taskId });
    }
  }

  /////////////////////////////////////

  return (
    <div className="tab" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h4>On Progress</h4>

      <div className="task-container">
        {onProgress.map((task, i) => (
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
    event.dataTransfer.setData("sourceTab", "onProgress"); // or "onProgress" depending on the source
  }

  function handleRemove() {
    dispatch({ type: "removeProgress", payload: id });
  }

  function ProgressMoveToFinished() {
    dispatch({ type: "progressMoveToFinished", payload: id });
  }

  return (
    <div
      className={`task ${backgroundColor}`}
      draggable // Make the task draggable
      onDragStart={handleDragStart} // Handle drag start event
    >
      <button className="btn-finished" onClick={ProgressMoveToFinished}>
        Finished
      </button>
      <span>Loading...</span>
      <button className="btn-close" onClick={handleRemove}>
        x
      </button>
      <h5>{taskName}</h5>

      <p className="task-title">{header}</p>
      <p className="task-description">{description}</p>
    </div>
  );
}
