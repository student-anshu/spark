import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PiListChecks } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { FaNoteSticky } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const location = useLocation();

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/login')
    };

    const cal = () => {
        navigate('/calender')
    }

    const today = () => {
        navigate('/today')
    }

    const isTodayActive = location.pathname === '/today';
    const isUpcomingActive = location.pathname === '/upcoming';
    const isStickActive = location.pathname === '/stick';
    const isCalenderActive = location.pathname === '/calender';

    const lists = [
        { name: 'Personal', color: 'bg-red-700', count: 3 },
        { name: 'Work', color: 'bg-sky-400', count: 3 },
        { name: 'List 1', color: 'bg-yellow-300', count: 3 }
    ];

    return (
        <div className={`h-full p-4 ${isCollapsed ? 'w-[4rem]' : 'bg-gray-200 lg:w-[20%] md:w-[25%] sm:w-[30%] xs:w-[40%]'} flex-shrink-0 rounded-xl transition-all duration-500 overflow-hidden flex flex-col justify-between`}>
            <div>
                <div className='flex justify-between items-center'>
                    {!isCollapsed && <h1 className='text-2xl font-bold text-gray-700 font-sans whitespace-nowrap'>Menu</h1>}
                    <FiMenu
                        className='text-2xl font-bold cursor-pointer'
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    />
                </div>
                {!isCollapsed && <div className='bg-transparent w-full flex justify-evenly border mt-3 border-gray-300 py-1 rounded-md px-2'>
                    <IoSearch className='text-2xl text-gray-500 ' />
                    <input type="text" placeholder='Search' className='outline-none flex-grow bg-transparent px-2' />
                </div>}
                {!isCollapsed && <h1 className='text-gray-700 font-bold text-xs mt-3 mb-2'>TASKS</h1>}


                {!isCollapsed && <div className='Upcomming cursor-pointer flex items-center hover:bg-gray-300 p-2 rounded-md transition-all mb-2'>
                    <MdKeyboardDoubleArrowRight className='text-gray-700 text-2xl font-bold' />
                    <h2 className='px-3 text-gray-600 font-medium'>Upcoming</h2>
                    <div className='ml-auto w-5 rounded-md flex justify-center items-center bg-white'>
                        <h6 className='font-semibold text-xs text-gray-800'>12</h6>
                    </div>

                </div>
                }
                {!isCollapsed && <div onClick={today} className={`TODAY cursor-pointer flex items-center mb-2 p-2 rounded-md transition-all ${isTodayActive ? 'bg-gray-300 text-white' : 'hover:bg-gray-300'}`}>
                    <PiListChecks className='text-gray-700 text-2xl font-bold' />
                    <h2 className='px-3 text-gray-600 font-medium'>Today</h2>
                    <div className='ml-auto w-5 rounded-md flex justify-center items-center bg-white'>
                        <h6 className='font-semibold text-xs text-gray-800 '>5</h6>
                    </div>

                </div>}

                {!isCollapsed && <div onClick={cal} className={`CALENDAR cursor-pointer flex items-center mb-2 p-2 rounded-md transition-all ${isCalenderActive ? 'bg-gray-300 text-white' : 'hover:bg-gray-300'}`}>
                    <SlCalender className='text-gray-700 text-xl font-bold' />
                    <h2 className='px-3 text-gray-600 font-medium'>Calendar</h2>
                    <div className='ml-auto w-5 rounded-md flex justify-center items-center bg-gray-300'>
                        <h6 className='font-semibold text-xs text-gray-800'>12</h6>
                    </div>

                </div>}

                {!isCollapsed && <div className='STICKY WALL cursor-pointer flex items-center hover:bg-gray-300 p-2 rounded-md transition-all mb-2'>
                    <FaNoteSticky className='text-gray-700 text-xl font-bold' />
                    <h2 className='px-3 text-gray-600 font-medium'>Sticky Wall</h2>
                    <div className='ml-auto w-5 rounded-md flex justify-center items-center bg-gray-300'>
                        <h6 className='font-semibold text-xs text-gray-800'>12</h6>
                    </div>

                </div>}
                {!isCollapsed && <hr className='mt-4 text-gray-100'></hr>}
                {!isCollapsed && <div className=' LISTSDIV mt-3 flex flex-col w-full  '>
                    <h1 className='text-gray-700 font-bold text-xs'>LISTS</h1>

                    {lists.map((list, index) => (
                        <div
                            key={index}
                            className='p-2 flex items-center cursor-pointer rounded-md hover:bg-gray-300 transition-all'
                        >
                            <div className={`h-4 w-4 ${list.color} rounded-md`}></div>
                            <h3 className='px-5 text-gray-600 font-medium'>{list.name}</h3>
                            <div className='ml-auto w-5 rounded-md flex justify-center items-center bg-gray-300'>
                                <h6 className='font-semibold text-xs text-gray-800'>{list.count}</h6>
                            </div>
                        </div>
                    ))}
                    <div className='cursor-pointer flex items-center hover:bg-gray-300 p-2 rounded-md transition-all'>
                        <IoAddOutline className='text-gray-700 text-xl font-bold' />
                        <h2 className='px-4 text-gray-600 font-semibold'>Add New List</h2>
                    </div>
                </div>}
            </div>
            {!isCollapsed && <div onClick={logout} className='cursor-pointer flex mt-10 items-center hover:bg-gray-300 p-2 rounded-md transition-all'>
                <FaSignOutAlt className='text-gray-700 text-xl font-bold' />
                <h2 className='px-3 text-gray-600 font-medium'>Sign Out</h2>


            </div>}

        </div>
    );
}

export default Sidebar;
