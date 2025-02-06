import React, { useState, useEffect } from 'react';
import { FiMenu } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PiListChecks } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { FaNoteSticky } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import TaskList from "./Tasklist";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState("");
    const [showNewListInput, setShowNewListInput] = useState(false);
    const [selectedList, setSelectedList] = useState(null); // New state to store selected list
    const [tasks, setTasks] = useState([]); // State to store tasks related to the selected list

    const location = useLocation();
    const navigate = useNavigate();

    // Fetch task lists on mount
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("No authentication token found.");
            return;
        }

        fetch('https://sparktodo.onrender.com/lists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("Fetched lists:", data);
                setLists(data);
            })
            .catch(error => {
                console.error("Error fetching lists:", error);
            });
    }, []); // Fetch once on component mount

    const fetchTasks = async (listId) => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("No authentication token found.");
            return;
        }

        try {
            const response = await fetch(`https://sparktodo.onrender.com/api/tasks/task/${listId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch tasks: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched tasks:", data);
            setTasks(data.tasks); // Set tasks related to the selected list
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Handle click on a list
    const handleListClick = (list) => {
        navigate(`/tasks/${list._id}`); // Navigate to the new route
    };


    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const cal = () => navigate('/calender');
    const today = () => navigate('/today');
    const upcomimg = () => navigate('/upcoming');
    const sticky = () => navigate('/sticky');

    const handleAddList = async () => {
        if (lists.length >= 3) {
            alert("You can only have up to 3 lists.");
            return;
        }

        const trimmedName = newListName.trim();

        if (!trimmedName) return;

        const isDuplicate = lists.some(list => list.name.toLowerCase() === trimmedName.toLowerCase());

        if (isDuplicate) {
            alert("A list with this name already exists.");
            return;
        }

        const newList = {
            name: trimmedName,
            color: "bg-blue-400", // Default color
            count: 0
        };

        const authToken = localStorage.getItem("authToken");

        try {
            const response = await fetch('https://sparktodo.onrender.com/lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(newList)
            });

            if (response.ok) {
                const savedList = await response.json();
                setLists(prevLists => [...prevLists, savedList].slice(0, 3));
            } else {
                console.error("Failed to add list");
            }
        } catch (error) {
            console.error("Error adding list:", error);
        }

        setNewListName("");
        setShowNewListInput(false);
    };

    return (
        <div className={`h-full p-4 ${isCollapsed ? 'w-[4rem]' : 'bg-gray-200 lg:w-[20%] md:w-[25%] sm:w-[30%] xs:w-[40%]'} flex-shrink-0 rounded-xl transition-all duration-500 overflow-hidden flex flex-col justify-between`}>
            <div>
                <div className='flex justify-between items-center'>
                    {!isCollapsed && <h1 className='text-2xl font-bold text-gray-700 font-sans whitespace-nowrap'>Menu</h1>}
                    <FiMenu className='text-2xl font-bold cursor-pointer' onClick={() => setIsCollapsed(!isCollapsed)} />
                </div>

                {!isCollapsed && (
                    <div className='bg-transparent w-full flex justify-evenly border mt-3 border-gray-300 py-1 rounded-md px-2'>
                        <IoSearch className='text-2xl text-gray-500 ' />
                        <input type="text" placeholder='Search' className='outline-none flex-grow bg-transparent px-2' />
                    </div>
                )}

                {!isCollapsed && <h1 className='text-gray-700 font-bold text-xs mt-3 mb-2'>TASKS</h1>}

                {/* List of tasks for the selected list */}
                {!isCollapsed && selectedList && tasks.length > 0 && (
                    <div className="task-list">
                        <h2 className="font-semibold text-gray-700 mb-2">Tasks in {selectedList.name}</h2>
                        <ul>
                            {tasks.map((task) => (
                                <li key={task._id} className="p-2 flex items-center cursor-pointer rounded-md hover:bg-gray-300 transition-all ">
                                    <div className="w-full text-gray-600">{task.title}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Other sidebar content */}
                {!isCollapsed && <div onClick={upcomimg} className={`Upcomming cursor-pointer flex items-center hover:bg-gray-300 p-2 rounded-md transition-all mb-2 ${location.pathname === '/upcoming' ? 'bg-gray-300 text-white' : 'hover:bg-gray-300'}`}>
                    <MdKeyboardDoubleArrowRight className='text-gray-700 text-2xl font-bold' />
                    <h2 className='px-3 text-gray-600 font-medium'>Upcoming</h2>
                </div>
                }
                {!isCollapsed && <div onClick={today} className={`TODAY cursor-pointer flex items-center mb-2 p-2 rounded-md transition-all ${location.pathname === '/today' ? 'bg-gray-300 text-white' : 'hover:bg-gray-300'}`}>
                    <PiListChecks className='text-gray-700 text-2xl font-bold' />
                    <h2 className='px-3 text-gray-600 font-medium'>Today</h2>
                </div>}

                {!isCollapsed && (
                    <div onClick={cal} className={`CALENDAR cursor-pointer flex items-center mb-2 p-2 rounded-md transition-all ${location.pathname === '/calender' ? 'bg-gray-300 text-white' : 'hover:bg-gray-300'}`}>
                        <SlCalender className='text-gray-700 text-xl font-bold' />
                        <h2 className='px-3 text-gray-600 font-medium'>Calendar</h2>
                    </div>
                )}

                {!isCollapsed && <hr className='mt-4 text-gray-100'></hr>}

                {!isCollapsed && (
                    <div className='LISTSDIV mt-3 flex flex-col w-full'>
                        <h1 className='text-gray-700 font-bold text-xs'>LISTS</h1>
                        {lists.map((list, index) => (
                            <div
                                key={index}
                                onClick={() => handleListClick(list)}
                                className='p-2 flex items-center cursor-pointer rounded-md hover:bg-gray-300 transition-all'
                            >
                                <div className={`h-4 w-4 ${list.color} rounded-md`}></div>
                                <h3 className='px-5 text-gray-600 font-medium truncate'>{list.name.length > 15 ? list.name.substring(0, 15) + "..." : list.name}</h3>
                                <div className='ml-auto w-5 rounded-md flex justify-center items-center bg-gray-300'>
                                    <h6 className='font-semibold text-xs text-gray-800'>{list.count}</h6>
                                </div>
                            </div>
                        ))}
                        {!isCollapsed && lists.length < 3 && (
                            <div onClick={() => setShowNewListInput(true)} className='cursor-pointer flex items-center hover:bg-gray-300 p-2 rounded-md transition-all'>
                                <IoAddOutline className='text-gray-700 text-xl font-bold' />
                                <h2 className='px-4 text-gray-600 font-semibold'>Add New List</h2>
                            </div>
                        )}
                        {showNewListInput && lists.length < 3 && (
                            <div className='flex gap-1 mt-2 flex-col'>
                                <div className='bg-transparent w-full flex justify-evenly border mt-3 border-gray-300 py-1 rounded-md px-2 overflow-hidden'>
                                    <input
                                        type="text"
                                        className='rounded-md px-2 py-1 flex-grow overflow-hidden outline-none'
                                        placeholder='New List Name'
                                        value={newListName}
                                        onChange={(e) => setNewListName(e.target.value)}
                                    />
                                </div>
                                <button onClick={handleAddList} className='px-3 py-1 bg-blue-500 text-white rounded-md'>Add</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {
                !isCollapsed && (
                    <div onClick={logout} className='cursor-pointer flex mt-10 items-center hover:bg-gray-300 p-2 rounded-md transition-all'>
                        <FaSignOutAlt className='text-gray-700 text-xl font-bold' />
                        <h2 className='px-3 text-gray-600 font-medium'>Sign Out</h2>
                    </div>
                )
            }
        </div >
    );
};

export default Sidebar;
