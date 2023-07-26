import { useState, useEffect } from "react";

import TabToDo from "./TabToDo";
import TabOnProgress from "./TabOnProgress";
import TabFinished from "./TabFinished";
import SortOrder from "./SortOrder";

export default function Content({ todo, onProgress, finished, dispatch }) {
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to update the current time
  const updateClock = () => {
    setCurrentTime(new Date());
  };

  // Effect to update the time every second
  useEffect(() => {
    const intervalId = setInterval(updateClock, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const opt = {
    hour: "numeric",
    minute: "numeric",
    //second: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    weekday: "long",
  };

  const locale = navigator.language;

  const date = new Intl.DateTimeFormat(locale, opt).format(currentTime);

  return (
    <div className="content">
      <p className="content-title">Today's Task</p>

      <p className="date">{date}</p>

      <TabToDo todo={todo} dispatch={dispatch} />
      <TabOnProgress onProgress={onProgress} dispatch={dispatch} />
      <TabFinished finished={finished} dispatch={dispatch} />
    </div>
  );
}
