import "./App.css";
import AddTaskForm from "./components/AddTaskForm";

function App() {
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
          <AddTaskForm />
        </section>
      </section>
    </main>
  );
}

export default App;