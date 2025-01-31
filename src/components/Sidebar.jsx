import React from 'react'
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
    return (

        <div className='m-6 bg-gray-200 min-w-[20%] rounded-xl'>
            <div className='flex p-4 justify-between items-center'>
                <h1 className='text-2xl font-bold font-sans'>Menu</h1>
                <FiMenu className='text-2xl font-bold cursor-pointer' />
            </div>
        </div>

    )
}

export default Sidebar