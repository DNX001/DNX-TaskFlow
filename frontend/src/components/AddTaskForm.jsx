import { useState } from "react";
import { API_URL } from "../config";

function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Task title cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          priority,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create task.");
      }

      setSuccess("Task added successfully.");
      setTitle("");
      setPriority("Medium");

      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group form-group-title">
        <label htmlFor="task-title">Task</label>

        <input
          id="task-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-priority">Priority</label>

        <select
          id="task-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>

      {error && <p className="form-message error-message">{error}</p>}
      {success && <p className="form-message success-message">{success}</p>}
    </form>
  );
}

export default AddTaskForm;