import { useState, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import Navbar from "./components/NavBar";
import Content from "./components/Content";

const initialState = JSON.parse(localStorage.getItem("state")) || {
  todo: [
    {
      id: uuidv4(),
      taskName: `Guide 1`,
      header: `onProgress and Finished button`,
      description: `Click the 'On Progress' or 'Finished' button if you want to move the items from one column to another.`,
      backgroundColor: "purple-task",
      dateAdded: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      taskName: `Guide 2`,
      header: `Drag and drop feature `,
      description: `You can drag and drop the items from the 'To Do' column to the 'On Progress' column. Just click and hold your left mouse button on an item and drag it to the 'On Progress' column. `,
      backgroundColor: "pink-task",
      dateAdded: new Date().toISOString(),
    },
  ],
  onProgress: [
    {
      id: uuidv4(),
      taskName: `Guide 3`,
      header: ``,
      description: `You can also drag and drop the items from the 'On Progress' column to the 'Finished' column to mark them as finished.`,
      backgroundColor: "green-task",
      dateAdded: new Date().toISOString(),
    },

    {
      id: uuidv4(),
      taskName: `Guide 4`,
      header: `"X" button`,
      description: `You can delete the tasks that you don't need to do by clicking the "X" button.`,
      backgroundColor: "yellow-task",
      dateAdded: new Date().toISOString(),
    },

    {
      id: uuidv4(),
      taskName: `Guide 5`,
      header: `Good luck and be productive :)))`,
      description: `Please give us some of your thoughts and reviews about our website.`,
      backgroundColor: "blue-task",
      dateAdded: new Date().toISOString(),
    },
  ],
  finished: [
    {
      id: uuidv4(),
      taskName: `Faded out content`,
      header: `Click the "X" button to remove your finished task.`,
      backgroundColor: "yellow-task",
      dateAdded: new Date().toISOString(),
    },
  ],
  sorted: null,
};

function moveTaskToState(state, taskId, sourceState, destinationState) {
  const taskToMove = state[sourceState].find((task) => task.id === taskId);
  const updatedSource = state[sourceState].filter((task) => task.id !== taskId);
  const updatedDestination = [...state[destinationState], taskToMove];
  return {
    ...state,
    [sourceState]: updatedSource,
    [destinationState]: updatedDestination,
  };
}

function reducer(state, action) {
  switch (action.type) {
    //////

    //ADD NEW ITEMS TO LIST

    case "add":
      const newTask = {
        id: uuidv4(), // Generate a unique id using uuid library
        taskName: action.payload.taskName,
        header: action.payload.header,
        description: action.payload.description,
        backgroundColor: action.payload.backgroundColor,
      };

      return {
        ...state,
        todo: [...state.todo, newTask],
      };

    ///////////////////////

    // MOVE ITEMS BETWEEN LISTS

    case "toDoMoveToProgress":
      return moveTaskToState(state, action.payload, "todo", "onProgress");

    case "toDoMoveToFinished":
      return moveTaskToState(state, action.payload, "todo", "finished");

    case "progressMoveToFinished":
      return moveTaskToState(state, action.payload, "onProgress", "finished");

    case "progressMoveToToDo":
      return moveTaskToState(state, action.payload, "onProgress", "todo");

    case "finishedMoveToToDo":
      return moveTaskToState(state, action.payload, "finished", "todo");

    case "finishedMoveToProgress":
      return moveTaskToState(state, action.payload, "finished", "onProgress");

    /////////////////////////////////

    // REMOVE ITEMS FROM LIST

    case "removeToDo":
      const toDoTaskID = action.payload;
      const updatedTodo = state.todo.filter((task) => task.id !== toDoTaskID);
      return {
        ...state,
        todo: updatedTodo,
      };

    case "removeFinished":
      const finishedTaskID = action.payload;
      const newFinished = state.finished.filter(
        (task) => task.id !== finishedTaskID
      );
      return {
        ...state,
        finished: newFinished,
      };

    case "removeProgress":
      const progressTaskID = action.payload;
      const newProgress = state.onProgress.filter(
        (task) => task.id !== progressTaskID
      );
      return {
        ...state,
        onProgress: newProgress,
      };

    /////////////////////////////////

    default:
      throw new Error("Action undefined");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const { todo, onProgress, finished, sorted } = state;

  // const addTask = (newTask) => {
  //   dispatch({ type: "add", payload: newTask });
  // };

  const addTask = (newTask) => {
    const currentDate = new Date().toISOString();
    const taskWithDate = { ...newTask, dateAdded: currentDate };
    dispatch({ type: "add", payload: taskWithDate });
  };

  return (
    <div className="container">
      <Navbar addTask={addTask} />

      <Content
        dispatch={dispatch}
        todo={todo}
        sorted={sorted}
        onProgress={onProgress}
        finished={finished}
      />

      <div className="copyright">
        &copy; Copyright 2023 by Caynhalavuon Team. All rights reserved.
        (Version 1.0.0)
      </div>
    </div>
  );
}
