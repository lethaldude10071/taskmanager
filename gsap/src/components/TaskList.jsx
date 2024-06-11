import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ITEMS_PER_PAGE = 5;

const TaskList = ({ tasks, updateTask, deleteTask, setTaskToEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const totalTasks = tasks.length;
  const totalPages = Math.ceil(totalTasks / ITEMS_PER_PAGE);

  const taskRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      taskRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
    );
  }, [tasks, currentPage]);

  const renderTask = (task, i) => (
    <div
      key={task.id}
      className="bg-white p-4 rounded-md mb-4 shadow-sm cursor-pointer"
      ref={(el) => (taskRefs.current[i] = el)}
      onClick={() =>
        setExpandedTaskId(expandedTaskId === task.id ? null : task.id)
      }
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      {expandedTaskId === task.id && (
        <>
          <p className="mb-2">{task.description}</p>
          <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
          <div className="mt-4">
            {task.status === "todo" && (
              <button
                onClick={() => updateTask({ ...task, status: "doing" })}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md mr-2"
              >
                Mark as Doing
              </button>
            )}
            {task.status === "doing" && (
              <button
                onClick={() => updateTask({ ...task, status: "completed" })}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mr-2"
              >
                Mark as Completed
              </button>
            )}
            <button
              onClick={() => setTaskToEdit(task)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">To Do</h2>
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            {todoTasks.map((task, i) => renderTask(task, i))}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Doing</h2>
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            {doingTasks.map((task, i) => renderTask(task, i))}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Completed</h2>
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            {completedTasks.map((task, i) => renderTask(task, i))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          className="px-3 py-1 mx-1 bg-gray-300 rounded-md"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((page) => Math.min(page + 1, totalPages))
          }
          className="px-3 py-1 mx-1 bg-gray-300 rounded-md"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
