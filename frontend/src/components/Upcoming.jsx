import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import Details from "./Details"; // Task details component
import { useNavigate } from "react-router";

const Upcoming = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const navigate = useNavigate();
    const create = () => navigate('/create');

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) => date.toISOString().split("T")[0];

    const categorizeTasks = (tasks) => {
        const categories = {
            todayTasks: [],
            tomorrowTasks: [],
            weekendTasks: [],
            upcomingTasks: [],
        };

        tasks.forEach((task) => {
            const taskDate = task.dueDate ? formatDate(new Date(task.dueDate)) : null;
            if (taskDate === formatDate(today)) categories.todayTasks.push(task);
            else if (taskDate === formatDate(tomorrow)) categories.tomorrowTasks.push(task);
            else if (taskDate) {
                const taskDay = new Date(task.dueDate).getDay();
                if (taskDay === 6 || taskDay === 0) categories.weekendTasks.push(task);
                else categories.upcomingTasks.push(task);
            }
        });
        return categories;
    };

    const fetchTasks = async () => {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
            setError("You are not authorized");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (response.ok) setTasks(data.tasks || []);
            else setError(data.message || "Failed to fetch tasks");
        } catch (error) {
            setError("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const { todayTasks, tomorrowTasks, weekendTasks, upcomingTasks } = categorizeTasks(tasks);

    const handleCheckboxToggle = async (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, completed: !task.completed } : task
            )
        );

        try {
            const token = localStorage.getItem("authToken");
            await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: !tasks.find((task) => task._id === taskId).completed }),
            });
        } catch (error) {
            console.error("Failed to update task status");
        }
    };

    const handleTaskClick = (task) => {
        setCurrentTask(task);
        setIsSlidePanelOpen(true);
    };

    const closeSlidePanel = () => {
        setIsSlidePanelOpen(false);
    };

    if (loading) return <div className="text-center text-gray-700">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="flex-grow p-4">
            <h1 className="text-2xl sm:text-3xl text-gray-800 font-bold">Upcoming Tasks</h1>

            <div className="flex flex-wrap w-full gap-2 h-full">
                {[{ title: "Today's Tasks", tasks: todayTasks },
                { title: "Tomorrow's Tasks", tasks: tomorrowTasks },
                { title: "Weekend Tasks", tasks: weekendTasks },
                { title: "Upcoming Tasks", tasks: upcomingTasks },
                ].map(({ title, tasks }) => (
                    <div key={title} className="mt-4 bg-white shadow-md rounded-lg p-4 w-[48%] h-[44%]">
                        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>

                        <div onClick={create} className="mt-4 p-3 cursor-pointer bg-gray-200 rounded-md flex items-center mb-2 hover:bg-gray-300 transition duration-200">
                            <IoAddOutline className="text-gray-700 text-xl mr-2" />
                            <span className="text-gray-700 font-semibold">Add New Task</span>
                        </div>

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
                                            <span className="text-gray-700 text-sm sm:text-base">{task.title}</span>
                                        </div>
                                        <FaAngleRight className="text-gray-600" />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-900 mt-2 text-center">No tasks available</p>
                        )}
                    </div>
                ))}
            </div>

            {isSlidePanelOpen && currentTask && (
                <Details task={currentTask} closePanel={closeSlidePanel} refreshTasks={fetchTasks} />
            )}
        </div>
    );
};

export default Upcoming;