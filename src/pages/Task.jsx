import React from 'react'
import Sidebar from '../components/Sidebar'
import TaskList from '../components/TaskList'

const Task = () => {
    return (
        <div className='flex h-screen w-screen p-6 gap-4'>
            <Sidebar />
            <TaskList />
        </div>
    )
}

export default Task