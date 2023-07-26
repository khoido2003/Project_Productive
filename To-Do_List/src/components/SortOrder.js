// import React from "react";

// export default function SortOrder({ dispatch }) {
//   function handleSort(event) {
//     const selectedOption = event.target.value;
//     if (selectedOption === "name") {
//       dispatch({ type: "sortByName" });
//     } else if (selectedOption === "description") {
//       dispatch({ type: "sortByDescription" });
//     } else {
//       dispatch({ type: "resetSort" });
//     }
//   }

//   return (
//     <div className="sort">
//       <select name="sortOptions" id="sortOptions" onChange={handleSort}>
//         <option value="default">Sort by Default</option>
//         <option value="name">Sort by Task's name</option>
//         <option value="description">Sort by Task's description</option>
//       </select>
//     </div>
//   );
// }
