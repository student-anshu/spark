import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`h-full p-4 ${isCollapsed ? 'w-16' : 'w-[20%] bg-gray-200'}  rounded-xl transition-all duration-500 overflow-hidden`}>
            <div className='flex justify-between items-center'>
                {!isCollapsed && <h1 className='text-2xl font-bold font-sans whitespace-nowrap'>Menu</h1>}
                <FiMenu
                    className='text-2xl font-bold cursor-pointer'
                    onClick={() => setIsCollapsed(!isCollapsed)}
                />
            </div>
            <div className='bg-transparent w-full flex justify-evenly border border-gray-400'>
            <IoSearch className='text-2xl '/>
                <input type="text" placeholder='Search' className='outline-none'/>
            </div>
        </div>
    );
}

export default Sidebar;
