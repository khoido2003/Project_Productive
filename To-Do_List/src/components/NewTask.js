import React, { useState } from "react";
import Documentation from "./Documentation";
import DailyQuotes from "./DailyQuotes";

export default function NewTask({ addTask }) {
  const [formData, setFormData] = useState({
    taskName: "",
    header: "",
    description: "",
    backgroundColor: "blue-task",
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isQuotesOpen, setIsQuotesOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   // Manually set each property of the formData state based on the input field's name
  //   if (name === "taskName") {
  //     setFormData({ ...formData, taskName: value });
  //   } else if (name === "header") {
  //     setFormData({ ...formData, header: value });
  //   } else if (name === "description") {
  //     setFormData({ ...formData, description: value });
  //   } else if (name === "backgroundColor") {
  //     setFormData({ ...formData, backgroundColor: value });
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(formData); // Call the addTask function from App component
    setFormData({
      taskName: "",
      header: "",
      description: "",
      backgroundColor: "purple-task",
    }); // Reset the form after submission
  };

  return (
    <>
      {isAddOpen ? (
        <div className="new-task">
          <div>
            <h5>New Task</h5>
            <button onClick={(isAddOpen) => setIsAddOpen(!isAddOpen)}>x</button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="input-label" htmlFor="">
              Task's name
            </label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
              placeholder="Build the Future"
              className="input-name input"
            />
            <label className="input-label" htmlFor="">
              Note/Reminder
            </label>
            <input
              type="text"
              name="header"
              value={formData.header}
              onChange={handleInputChange}
              placeholder="Project X, 4pm-5.30pm,...."
              className="input-header input"
            />
            <label className="input-label" htmlFor="">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input-description"
              placeholder="Some crazy idea..."
              rows="7"
              cols="23"
            />

            <label className="input-label" htmlFor="">
              Background Color
            </label>
            <select
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleInputChange}
              className="task-color"
            >
              <option value="">Choose your color</option>
              <option className="purple-task" value="purple-task">
                Purple
              </option>
              <option className="pink-task" value="pink-task">
                Pink
              </option>
              <option className="green-task" value="green-task">
                Green
              </option>
              <option className="blue-task" value="blue-task">
                Blue
              </option>
              <option className="yellow-task" value="yellow-task">
                Yellow
              </option>

              <option className="orange-task" value="orange-task">
                Orange
              </option>
            </select>

            <button type="submit" className="task-btn">
              Add
            </button>
          </form>
        </div>
      ) : (
        <button
          className="btn-navbar"
          onClick={() => setIsAddOpen((prevIsAddOpen) => !prevIsAddOpen)}
          disabled={isDocOpen || isQuotesOpen}
        >
          Add New Task +
        </button>
      )}

      {isQuotesOpen ? (
        <DailyQuotes
          isQuotesOpen={isQuotesOpen}
          setIsQuotesOpen={setIsQuotesOpen}
        />
      ) : (
        <button
          className="btn-navbar btn-navbar-secondary"
          disabled={isAddOpen || isDocOpen}
          onClick={() => setIsQuotesOpen((isQuotesOpen) => !isQuotesOpen)}
        >
          Daily Quotes
        </button>
      )}

      {isDocOpen ? (
        <Documentation isDocOpen={isDocOpen} setIsDocOpen={setIsDocOpen} />
      ) : (
        <button
          className="btn-navbar btn-navbar-secondary"
          onClick={() => setIsDocOpen((isDocOpen) => !isDocOpen)} // Fix the onClick event
          disabled={isAddOpen || isQuotesOpen}
        >
          Documentation
        </button>
      )}
    </>
  );
}
