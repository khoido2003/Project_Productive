export default function Documentation({ setIsDocOpen, isDocOpen }) {
  return (
    <div className="documentation-container">
      <div className="documentation-item">
        <h3>Guide 1</h3>
        <p>onProgress and Finished button</p>
        <p>
          Click the 'On Progress' or 'Finished' button if you want to move the
          items from one column to another.
        </p>
      </div>

      <div className="documentation-item">
        <h3>Guide 2</h3>
        <p>Drag and drop feature</p>
        <p>
          You can drag and drop the items from the 'To Do' column to the 'On
          Progress' column. Just click and hold your left mouse button on an
          item and drag it to the 'On Progress' column.
        </p>
      </div>

      <div className="documentation-item">
        <h3>Guide 3</h3>
        <p>Drag and drop feature</p>
        <p>
          You can also drag and drop the items from the 'On Progress' column to
          the 'Finished' column to mark them as finished.
        </p>
      </div>

      <div className="documentation-item">
        <h3>Guide 4</h3>
        <p>"X" button</p>
        <p>
          You can delete the tasks that you don't need to do by clicking the "X"
          button.
        </p>
      </div>

      <div className="documentation-item">
        <h3>Guide 5</h3>
        <p>Faded out content</p>
        <p>Click the "X" button to remove your finished task.</p>
      </div>

      <button
        className="task-btn"
        onClick={() => setIsDocOpen((isDocOpen) => !isDocOpen)}
      >
        &larr; Return
      </button>
    </div>
  );
}
