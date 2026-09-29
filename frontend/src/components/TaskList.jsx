import { useEffect, useState } from "react";

function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completingId, setCompletingId] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/tasks");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tasks.");
      }

      setTasks(data.tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  const handleComplete = async (taskId) => {
    try {
      setCompletingId(taskId);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}/complete`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to complete task.");
      }

      await fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setCompletingId("");
    }
  };

  if (loading) {
    return <p className="task-list-message">Loading tasks...</p>;
  }

  if (error && tasks.length === 0) {
    return <p className="task-list-message error-message">{error}</p>;
  }

  if (tasks.length === 0) {
    return <p className="task-list-message">No tasks yet.</p>;
  }

  return (
    <section className="task-list">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <span>{tasks.length} tasks</span>
      </div>

      {error && <p className="task-list-message error-message">{error}</p>}

      <div className="task-items">
        {tasks.map((task) => (
          <article
            className={`task-card ${task.completed ? "completed" : ""}`}
            key={task._id}
          >
            <div className="task-card-content">
              <div>
                <h3>{task.title}</h3>

                <div className="task-meta">
                  <span
                    className={`priority priority-${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                  <span>{task.completed ? "Completed" : "Pending"}</span>
                </div>
              </div>

              {!task.completed && (
                <button
                  className="complete-button"
                  onClick={() => handleComplete(task._id)}
                  disabled={completingId === task._id}
                >
                  {completingId === task._id
                    ? "Completing..."
                    : "Mark Complete"}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TaskList;