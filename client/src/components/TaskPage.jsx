import React, { useState, useEffect } from "react";
import "./TaskPage.css";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [collaborator, setCollaborator] = useState("");

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (newTask.trim()) {
      const newTaskObj = {
        text: newTask,
        completed: false,
        priority: priority,
        dueDate: dueDate,
        collaborator: collaborator,
      };

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTaskObj),
      });

      if (response.ok) {
        const data = await response.json();
        setTasks([...tasks, data]);
        setNewTask("");
        setPriority("");
        setDueDate("");
        setCollaborator("");
      } else {
        console.error("Failed to add task");
      }
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Mark a task as completed
  const completeTask = async (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    const updatedTask = { ...taskToUpdate, completed: true };

    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTask),
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  // Filter tasks based on their status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return filter === "completed" ? task.completed : !task.completed;
  });

  return (
    <div className="task-page">
      <h1>TASKS</h1>
      <div className="add-task-section">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Set Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Collaborator"
          value={collaborator}
          onChange={(e) => setCollaborator(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <button onClick={() => setFilter("all")}>All Tasks</button>
        <button onClick={() => setFilter("completed")}>Completed Tasks</button>
        <button onClick={() => setFilter("pending")}>Pending Tasks</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <div className="task-text">
                <span>{task.text}</span>
                <span className="task-date">{task.date}</span>
                {task.priority && (
                  <span className="task-priority">{task.priority}</span>
                )}
                {task.dueDate && (
                  <span className="task-due-date">Due: {task.dueDate}</span>
                )}
                {task.collaborator && (
                  <span className="task-collaborator">
                    Collaborator: {task.collaborator}
                  </span>
                )}
              </div>
              <div className="task-actions">
                {!task.completed && (
                  <button onClick={() => completeTask(task.id)}>Complete</button>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer>
        <p>&copy; 2025 TaskMaster. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default TaskPage;
