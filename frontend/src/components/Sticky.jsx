import React, { useState, useEffect } from 'react';

const TaskList = ({ listId }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            // Reset tasks to an empty array on page load or reload
            setTasks([]);
            setLoading(true);
            setError(null); // Reset any previous error

            const token = localStorage.getItem("authToken");
            if (!token) {
                setError("You are not authorized");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://todo-spark.onrender.com:5000/api/tasks/task/${listId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    if (data.tasks) {
                        setTasks(data.tasks);
                    } else {
                        setError("No tasks found.");
                    }
                    setError(null); // Clear any previous errors if tasks fetched successfully
                } else {
                    setError(data.message || "Failed to fetch tasks");
                }
            } catch (error) {
                setError("Error connecting to server");
            } finally {
                setLoading(false);
            }
        };

        if (listId) fetchTasks(); // Only fetch tasks if listId exists

    }, [listId]);

    // Conditional rendering based on loading, error, and tasks
    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Tasks for List: {listId}</h2>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
