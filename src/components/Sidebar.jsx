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

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/login')
    };


    return (
        <div className={`h-full p-4 ${isCollapsed ? 'w-16' : 'w-[20%] bg-gray-200'}  rounded-xl transition-all duration-500 overflow-hidden`}>
            <div className='flex justify-between items-center'>
                {!isCollapsed && <h1 className='text-2xl font-bold text-gray-700 font-sans whitespace-nowrap'>Menu</h1>}
                <FiMenu
                    className='text-2xl font-bold cursor-pointer'
                    onClick={() => setIsCollapsed(!isCollapsed)}
                />
            </div>
            {!isCollapsed && <div className='bg-transparent w-full flex justify-evenly border mt-3 border-gray-300'>
                <IoSearch className='text-2xl text-gray-500 ' />
                <input type="text" placeholder='Search' className='outline-none ' />
            </div>}
            {!isCollapsed && <h1 className='text-gray-700 font-bold text-xs mt-3'>TASKS</h1>}


            {!isCollapsed && <div className='Upcomming cursor-pointer flex mt-3'>
                <MdKeyboardDoubleArrowRight className='text-gray-700 text-xl font-bold mt-1' />
                <h2 className='px-3 text-gray-600 font-medium'>Upcoming</h2>
                <div className='ml-30 w-5 rounded-md mt-1 flex justify-center items-center bg-gray-300'>
                    <h6 className='font-semibold text-xs text-gray-800'>12</h6>
                </div>

            </div>
            }
            {!isCollapsed && <div className='TODAY cursor-pointer flex mt-3'>
                <PiListChecks className='text-gray-700 text-2xl font-bold mt-1' />
                <h2 className='px-3 text-gray-600 font-medium'>Today</h2>
                <div className='ml-37 w-5 rounded-md mt-1 flex justify-center items-center bg-white'>
                    <h6 className='font-semibold text-xs text-gray-800 '>5</h6>
                </div>

            </div>}

            {!isCollapsed && <div className='CALENDAR cursor-pointer flex mt-3'>
                <SlCalender className='text-gray-700 text-xl font-bold mt-1' />
                <h2 className='px-3 text-gray-600 font-medium'>Calendar</h2>
                <div className='ml-33 w-5 rounded-md mt-1 flex justify-center items-center bg-gray-300'>
                    <h6 className='font-semibold text-xs text-gray-800'>12</h6>
                </div>

            </div>}

            {!isCollapsed && <div className='STICKY WALL cursor-pointer flex mt-3'>
                <FaNoteSticky className='text-gray-700 text-xl font-bold mt-1' />
                <h2 className='px-3 text-gray-600 font-medium'>Sticky Wall</h2>
                <div className='ml-30 w-5 rounded-md mt-1 flex justify-center items-center bg-gray-300'>
                    <h6 className='font-semibold text-xs text-gray-800'>12</h6>
                </div>

            </div>}
            {!isCollapsed && <hr className='mt-4 text-gray-100'></hr>}
            {!isCollapsed && <div className=' LISTSDIV mt-3 flex flex-col w-full  '>
                <h1 className='text-gray-700 font-bold text-sm mt-2'>LISTS</h1>

                <div className=' px-2 py-4 w-full h-4 flex items-center cursor-pointer  mt-3 rounded-md'>
                    <div className=' h-4 w-4 bg-red-700 rounded-md  '></div>
                    <h3 className='px-5 text-gray-600 font-medium'>Personal</h3>
                    <div className=' ml-25 h-4 w-7 rounded-md  flex justify-center items-center bg-gray-300'>
                        <h6 className='font-semibold text-xs text-gray-800'>3</h6>
                    </div>
                </div>

                <div className=' px-2 py-4 w-full h-4 flex items-center cursor-pointer  mt-3 rounded-md'>
                    <div className=' h-4 w-4 bg-sky-400 rounded-md  '></div>
                    <h3 className='px-5 text-gray-600 font-medium'>Work</h3>
                    <div className=' ml-31 h-4 w-7 rounded-md  flex justify-center items-center bg-gray-300'>
                        <h6 className='font-semibold text-xs text-gray-800'>3</h6>
                    </div>
                </div>

                <div className=' px-2 py-4 w-full h-4 flex items-center  cursor-pointer mt-3 rounded-md'>
                    <div className=' h-4 w-4 bg-yellow-300 rounded-md  '></div>
                    <h3 className='px-5 text-gray-600 font-medium'>List 1</h3>
                    <div className=' ml-32 h-4 w-7 rounded-md  flex justify-center items-center bg-gray-300'>
                        <h6 className='font-semibold text-xs text-gray-800'>3</h6>
                    </div>
                </div>

                <div className=' cursor-pointer flex mt-3'>
                    <IoAddOutline className='text-gray-700 text-xl font-bold mt-1' />
                    <h2 className='px-4 text-gray-600 font-semibold'>Add New List</h2>
                </div>
            </div>}

            {!isCollapsed && <hr className='mt-4 text-gray-100'></hr>}
            {!isCollapsed && <h1 className='text-gray-700 font-bold text-sm mt-2'>TAGS</h1>}
            {!isCollapsed && <div className='w-full flex gap-3 '>
                <div className='px-2 py-0.5 mt-1 cursor-pointer bg-blue-200 rounded-md flex items-center'>
                     <h1 className='font-semibold text-gray-600'>Tag 1</h1>
                </div>

                <div className='px-2 py-0.5 mt-1 cursor-pointer bg-pink-400 rounded-md flex items-center'>
                     <h1 className='font-semibold text-gray-600'>Tag 2</h1>
                </div> 

                <div className='px-2 py-0.5 mt-1 cursor-pointer bg-gray-300 rounded-md  flex items-center'>
                     <h1 className='font-semibold flex items-center justify-center text-gray-600'> 
                     <IoAddOutline className='text-gray-700 text-xl font-bold ' />
                        Add Tag</h1>
                </div>

            </div>}
           
            {!isCollapsed && <div onClick={logout} className='CALENDAR cursor-pointer flex mt-20'>
                <FaSignOutAlt  className='text-gray-700 text-xl font-bold mt-1' />
                <h2 className='px-3 text-gray-600 font-medium'>Sign Out</h2>
                

            </div>}

        </div>
    );
}

export default Sidebar;
