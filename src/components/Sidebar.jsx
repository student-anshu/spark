import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`h-full ${isCollapsed ? 'w-16' : 'w-[20%] bg-gray-200'}  rounded-xl transition-all duration-500 overflow-hidden`}>
            <div className='flex p-4 justify-between items-center'>
                {!isCollapsed && <h1 className='text-2xl font-bold font-sans whitespace-nowrap'>Menu</h1>}
                <FiMenu
                    className='text-2xl font-bold cursor-pointer'
                    onClick={() => setIsCollapsed(!isCollapsed)}
                />
            </div>
        </div>
    );
}

export default Sidebar;
