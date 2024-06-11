import { useState, useEffect } from "react";

const TaskForm = ({ addTask, editTask, taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;
    if (taskToEdit) {
      editTask({ ...taskToEdit, title, description, dueDate });
    } else {
      addTask({ title, description, dueDate, status: "todo" });
    }
    setTitle("");
    setDescription("");
    setDueDate("");
    setTaskToEdit(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mr-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mr-2"
      />
      <input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
      {taskToEdit && (
        <button
          type="button"
          onClick={() => setTaskToEdit(null)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
