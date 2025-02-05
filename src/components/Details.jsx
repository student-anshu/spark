import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";

const Details = ({ task, closePanel, refreshTasks }) => {
    const [updatedTask, setUpdatedTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        list: "", // Leave empty initially
        completed: false,
    });

    const [loading, setLoading] = useState(false);
    const [completing, setCompleting] = useState(false);
    const [taskLists, setTaskLists] = useState([]); // State for task lists

    useEffect(() => {
        const fetchTaskLists = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    alert("You are not authorized!");
                    return;
                }

                const response = await fetch("https://todo-spark.onrender.com:5000/lists", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch task lists");
                }

                const data = await response.json();
                console.log("Fetched task lists:", data); // Debugging task list data

                if (Array.isArray(data) && data.length > 0) {
                    setTaskLists(data); // Assuming response contains an array of task lists
                } else {
                    console.error("No task lists found or invalid response");
                }
            } catch (error) {
                console.error("Error fetching task lists:", error);
            }
        };

        fetchTaskLists();

        if (task) {
            setUpdatedTask({
                title: task.title || "",
                description: task.description || "",
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
                priority: task.priority || "Low",
                list: task.list || "", // Preselect list if exists
                completed: task.completed || false,
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!updatedTask.title.trim()) {
            alert("Task title cannot be empty!");
            return;
        }

        // Validate due date: it should not be in the past
        const currentDate = new Date();
        const dueDate = new Date(updatedTask.dueDate);

        setLoading(true);

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("You are not authorized!");
                setLoading(false);
                return;
            }

            const formattedTask = {
                ...updatedTask,
                dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString() : null,
            };

            // Debugging request body
            console.log("Sending updated task:", formattedTask);

            const response = await fetch(`https://todo-spark.onrender.com:5000/api/tasks/${task._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formattedTask),
            });

            if (!response.ok) {
                const data = await response.json();
                console.error("Error updating task:", data); // Debugging server response
                throw new Error("Failed to update task");
            }

            alert("Task updated successfully!");
            refreshTasks(); // Update state instead of reloading
            closePanel(); // Close details panel
        } catch (error) {
            console.error("Error updating task:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleComplete = async () => {
        if (updatedTask.completed) return;

        setCompleting(true);

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("You are not authorized!");
                setCompleting(false);
                return;
            }

            const response = await fetch(`https://todo-spark.onrender.com:5000/api/tasks/${task._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    completed: true,
                    priority: updatedTask.priority,
                    list: updatedTask.list,
                }),
            });

            setUpdatedTask((prev) => ({ ...prev, completed: true }));
            refreshTasks();
        } catch (error) {
            console.error("Error completing task:", error);
        } finally {
            setCompleting(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("You are not authorized!");
                return;
            }

            const response = await fetch(`https://todo-spark.onrender.com:5000/api/tasks/${task._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                console.error("Error deleting task:", data);
                throw new Error("Failed to delete task");
            }

            alert("Task deleted successfully!");
            refreshTasks();
            closePanel();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] bg-white shadow-xl z-50 flex flex-col p-6"
        >
            <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <h1 className="text-xl font-semibold text-gray-700">Edit Task</h1>
                <ImCross className="text-gray-500 cursor-pointer" onClick={closePanel} />
            </div>

            <div className="mt-4">
                <label className="text-gray-600 font-medium">Task Title</label>
                <input
                    type="text"
                    name="title"
                    value={updatedTask.title}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div className="mt-4">
                <label className="text-gray-600 font-medium">Description</label>
                <textarea
                    name="description"
                    value={updatedTask.description}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-400 outline-none h-28"
                ></textarea>
            </div>

            <div className="mt-4">
                <label className="text-gray-600 font-medium">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={updatedTask.dueDate}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div className="mt-4">
                <label className="text-gray-600 font-medium">Priority</label>
                <select
                    name="priority"
                    value={updatedTask.priority}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="mt-4">
                <label className="text-gray-600 font-medium">List</label>
                <select
                    name="list"
                    value={updatedTask.list}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none"
                >
                    {taskLists.map((list) => (
                        <option key={list._id} value={list.name}>
                            {list.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-4 mt-6">
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition duration-200"
                >
                    Delete Task
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="py-2 rounded-md font-medium bg-yellow-300 hover:bg-yellow-400"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                    onClick={handleComplete}
                    disabled={updatedTask.completed}
                    className="py-2 rounded-md font-medium bg-blue-500 hover:bg-blue-600 text-white"
                >
                    {updatedTask.completed ? "Task Completed" : "Mark as Complete"}
                </button>
            </div>
        </motion.div>
    );
};

export default Details;
