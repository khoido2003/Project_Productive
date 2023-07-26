import { useEffect, useState } from "react";

export default function DailyQuotes({ setIsQuotesOpen, isQuotesOpen }) {
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getAdvice() {
    try {
      setIsLoading(true);
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) throw new Error("Somthing went wrong with fetching");
      const data = await res.json();
      if (data.Response === "False") throw new Error("Quotes not found");
      setAdvice(data.slip.advice);
      // setError("");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      getAdvice();
    },
    [advice]
  );

  return (
    <div className="quotes-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>{advice}</h1>
          <button className="quotes-btn" onClick={getAdvice}>
            Get advice
          </button>
          <button
            className="task-btn"
            onClick={() => setIsQuotesOpen((isQuotesOpen) => !isQuotesOpen)}
          >
            &larr; Return
          </button>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
