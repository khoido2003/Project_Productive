export default function TabToDo({ todo, dispatch }) {
  function handleDragOver(event) {
    // Prevent default to allow the drop
    event.preventDefault();
  }

  // Drag and Drop function
  function handleDrop(event) {
    // Get the task id from the data transferred during the drag
    const taskId = event.dataTransfer.getData("task");
    const sourceTab = event.dataTransfer.getData("sourceTab");

    //dispatch({ type: "progressMoveToToDo", payload: taskId });

    if (sourceTab === "onProgress") {
      dispatch({ type: "progressMoveToToDo", payload: taskId });
    } else if (sourceTab === "finished") {
      dispatch({ type: "finishedMoveToToDo", payload: taskId });
    }
  }

  return (
    <div className="tab" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h4>To do</h4>

      <div className="task-container">
        {todo.map((task, i) => (
          <Task task={task} dispatch={dispatch} key={i} />
        ))}
      </div>
    </div>
  );
}

function Task({ task, dispatch }) {
  const { id, taskName, header, description, backgroundColor, dateAdded } =
    task;

  function handleRemove() {
    dispatch({ type: "removeToDo", payload: id });
  }

  function handleMoveToProgress() {
    dispatch({ type: "toDoMoveToProgress", payload: id });
  }

  function handleMoveToFinished() {
    dispatch({ type: "toDoMoveToFinished", payload: id });
  }

  function handleDragStart(event) {
    event.dataTransfer.setData("task", id);
    event.dataTransfer.setData("sourceTab", "todo");
  }

  return (
    <div
      className={`task ${backgroundColor}`}
      draggable
      onDragStart={handleDragStart}
    >
      <button className="btn-progress" onClick={handleMoveToProgress}>
        On Progress
      </button>
      <button className="btn-finished" onClick={handleMoveToFinished}>
        Finished
      </button>
      <button className="btn-close" onClick={handleRemove}>
        x
      </button>
      <h5>{taskName}</h5>
      <p className="task-title">{header}</p>
      <p className="task-description">{description}</p>
      {/* <p>Date Added: {new Date(task.dateAdded).toLocaleDateString()}</p> */}
    </div>
  );
}
