import { useEffect, useState } from "react";
import "./App.css";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("dnx-taskflow-theme") || "system";
  });

  const handleTaskAdded = () => {
    setRefreshKey((currentKey) => currentKey + 1);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const resolvedTheme =
        theme === "system"
          ? mediaQuery.matches
            ? "dark"
            : "light"
          : theme;

      document.documentElement.setAttribute("data-theme", resolvedTheme);
    };

    applyTheme();

    localStorage.setItem("dnx-taskflow-theme", theme);

    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);
    }

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
  }, [theme]);

  return (
    <main className="app">
      <section className="taskflow">
        <header className="app-header">
          <div className="header-top">
            <p className="eyebrow">DNX PRODUCTIVITY</p>

            <div className="theme-switcher">
              {["system", "light", "dark"].map((option) => (
                <button
                  key={option}
                  className={theme === option ? "active" : ""}
                  onClick={() => setTheme(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

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