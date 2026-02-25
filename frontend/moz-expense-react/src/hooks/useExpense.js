import { useEffect, useState } from "react";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../services/api";

export function useExpenses() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user's expenses on mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      setLoading(true);
      const data = await getExpenses();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleTaskCompleted(id) {
    const task = tasks.find((t) => t.id === id);
    try {
      const updatedTask = await updateExpense(id, { 
        completed: !task.completed 
      });
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function deleteTask(id) {
    try {
      await deleteExpense(id);
      setTasks(tasks.filter((task) => id !== task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function editTask(id, newName) {
    try {
      const updatedTask = await updateExpense(id, { name: newName });
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  }

  async function addTask(name) {
    try {
      const newTask = await createExpense(name);
      setTasks([...tasks, newTask]);
      return newTask;
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  return {
    tasks,
    loading,
    error,
    toggleTaskCompleted,
    deleteTask,
    editTask,
    addTask,
  };
}