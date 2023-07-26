import NewTask from "./NewTask";

export default function Navbar({ addTask }) {
  return (
    <div className="navbar">
      <NewTask addTask={addTask} />
    </div>
  );
}
