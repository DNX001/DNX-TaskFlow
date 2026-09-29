import { useState } from "react";
import "./App.css";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskAdded = () => {
    setRefreshKey((currentKey) => currentKey + 1);
  };

  return (
    <main className="app">
      <section className="taskflow">
        <header className="app-header">
          <p className="eyebrow">DNX PRODUCTIVITY</p>
          <h1>DNX TaskFlow</h1>
          <p className="subtitle">
            Organise your work. Prioritise what matters. Finish strong.
          </p>
        </header>

        <section className="workspace">
          <AddTaskForm onTaskAdded={handleTaskAdded} />

          <TaskList refreshKey={refreshKey} />
        </section>
      </section>
    </main>
  );
}

export default App;