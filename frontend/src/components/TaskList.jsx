import { useCallback, useEffect, useState } from "react";

function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completingId, setCompletingId] = useState("");
  const [completingAll, setCompletingAll] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("All");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let url = "http://localhost:5000/api/tasks";

      if (priorityFilter !== "All") {
        url += `?priority=${priorityFilter}`;
      }

      const response = await fetch(url);
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
  }, [priorityFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, refreshKey]);

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

  const handleCompleteAll = async () => {
    try {
      setCompletingAll(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/tasks/complete-all",
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to complete all tasks.");
      }

      await fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setCompletingAll(false);
    }
  };

  const hasPendingTasks = tasks.some((task) => !task.completed);

  return (
    <section className="task-list">
      <div className="task-list-header">
        <div>
          <h2>Your Tasks</h2>
          <span>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        <div className="task-list-actions">
          <div className="priority-filters">
            {["All", "Low", "Medium", "High"].map((priority) => (
              <button
                key={priority}
                className={`filter-button ${
                  priorityFilter === priority ? "active" : ""
                }`}
                onClick={() => setPriorityFilter(priority)}
              >
                {priority}
              </button>
            ))}
          </div>

          <button
            className="complete-all-button"
            onClick={handleCompleteAll}
            disabled={!hasPendingTasks || completingAll}
          >
            {completingAll ? "Completing..." : "Mark All Complete"}
          </button>
        </div>
      </div>

      {error && <p className="task-list-message error-message">{error}</p>}

      {loading ? (
        <p className="task-list-message">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="task-list-message">
          No {priorityFilter === "All" ? "" : priorityFilter.toLowerCase()} tasks
          found.
        </p>
      ) : (
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
      )}
    </section>
  );
}

export default TaskList;