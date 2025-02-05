import React, { useEffect, useState } from 'react';
import { IoAddOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import Details from './Details'; // Task details component
import { useNavigate } from 'react-router';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const navigate = useNavigate();
  const create = () => navigate('/create');

  // Fetch tasks from backend
  const fetchTasks = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("You are not authorized");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const data = await response.json();
      if (response.ok) {
        setTasks(data.tasks || []);
      } else {
        setError(data.message || "Failed to fetch tasks");
      }
    } catch (error) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Toggle Task Completion
  const handleCheckboxToggle = async (taskId) => {
    const updatedTasks = tasks.map(task =>
      task._id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    try {
      const token = localStorage.getItem('authToken');
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: !tasks.find(task => task._id === taskId).completed })
      });
    } catch (error) {
      console.error("Failed to update task status");
    }
  };

  const handleTaskClick = (task) => {
    if (task) {
      setCurrentTask(task);
      setIsSlidePanelOpen(true);
    }
  };

  const closeSlidePanel = () => {
    setIsSlidePanelOpen(false);
  };

  if (loading) return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className='flex-grow p-4'>
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl text-gray-800 font-bold font-sans whitespace-nowrap">
          Tasks ({tasks.length})
        </h1>
      </div>

      {/* Add New Task Button */}
      <div onClick={create} className='mt-4 p-3 cursor-pointer bg-gray-200 rounded-md flex items-center hover:bg-gray-300 transition duration-200'>
        <IoAddOutline className='text-gray-700 text-xl mr-2' />
        <span className='text-gray-700 font-semibold'>Add New Task</span>
      </div>

      {/* Render Task List */}
      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-all"
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxToggle(task._id);
                    }}
                    className="cursor-pointer"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">
                    {task.title}
                  </span>
                </div>
                <FaAngleRight className="text-gray-600" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks available</p>
        )}
      </div>

      {/* Task Details Panel */}
      {isSlidePanelOpen && currentTask && (
        <Details task={currentTask} closePanel={closeSlidePanel} refreshTasks={fetchTasks} />
      )}
    </div>
  );
};

export default Main;
