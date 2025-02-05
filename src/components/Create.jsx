import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [task, setTask] = useState({ title: "", description: "", list: "", dueDate: "", priority: "Low" });
    const [message, setMessage] = useState("");
    const [taskLists, setTaskLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const today = new Date().toISOString().split("T")[0];
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("No authentication token found.");
            setMessage("You are not authorized. Please log in first.");
            return;
        }

        fetch('http://todo-spark.onrender.com:5000/lists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("Fetched lists:", data);
                setTaskLists(data); // Update taskLists with fetched data
                if (data.length > 0) {
                    setTask((prevTask) => ({
                        ...prevTask,
                        list: data[0].name, // Set the first list as the default
                    }));
                }
            })
            .catch(error => {
                console.error("Error fetching lists:", error);
                setMessage("Error fetching task lists");
            })
            .finally(() => {
                setLoading(false); // Set loading to false after fetch is done
            });
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setTask((prevTask) => {
            const updatedTask = { ...prevTask, [name]: value || today }; // Force update

            console.log("Updated task state:", updatedTask); // Debugging log

            return updatedTask;
        });
    };



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");

        if (!token) {
            setMessage("You are not authorized. Please log in first.");
            return;
        }

        const selectedList = taskLists.find((list) => list.name === task.list);
        const listId = selectedList ? selectedList._id : null;

        if (!listId) {
            setMessage("Please select a valid task list.");
            return;
        }

        // Ensure dueDate is always present
        const taskData = {
            ...task,
            listId,
            dueDate: task.dueDate || today, // Ensure dueDate is set
        };

        console.log("Before sending request, task object:", taskData); // Debug log

        try {
            const response = await fetch("http://todo-spark.onrender.com:5000/api/tasks/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json();
            console.log("Response from server:", data); // Check response

            if (response.ok) {
                setMessage("Task created successfully!");
                navigate("/");
            } else {
                setMessage(data.error || "Failed to create task");
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
            setMessage("Error connecting to server");
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col flex-grow justify-between">
                <div>
                    <h1 className="text-4xl font-bold">Create a Task</h1>

                    {message && <p className="text-center mt-2 text-red-500">{message}</p>}

                    <div className="w-full flex justify-between items-center py-2 rounded-md bg-transparent border border-gray-300">
                        <input
                            className="px-4 outline-none w-full bg-transparent"
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="w-full h-64 mt-2 py-2 rounded-md bg-transparent flex items-start">
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm resize-none h-64"
                            name="description"
                            placeholder="Task Description"
                            value={task.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center mt-3">
                        <h2 className="pr-4">List</h2>
                        <select
                            className="bg-gray-300 rounded-md px-3 py-1 w-full sm:w-auto"
                            name="list"
                            value={task.list}
                            onChange={handleChange}
                            disabled={loading} // Disable the dropdown while loading
                        >
                            {loading ? (
                                <option value="">Loading...</option>
                            ) : (
                                taskLists.length > 0 ? (
                                    taskLists.map((list) => (
                                        <option key={list._id} value={list.name}>
                                            {list.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No lists available</option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center mt-3">
                        <h2 className="pr-4">Due date</h2>
                        <input
                            className="bg-gray-300 rounded-md px-3 py-1 w-full sm:w-auto"
                            type="date"
                            name="dueDate"
                            value={task.dueDate || today} // Ensure it is initialized
                            min={today}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center mt-3">
                        <h2 className="pr-4">Priority</h2>
                        <select
                            className="bg-gray-300 rounded-md px-3 py-1 w-full sm:w-auto"
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className="button flex flex-col items-center mt-5 gap-4">
                    <button
                        className="bg-blue-500 px-5 py-2 rounded-md text-medium font-semibold text-gray-700 w-full"
                        type="submit"
                        disabled={loading}
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Create;
