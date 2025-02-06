import React from 'react'
import Sidebar from '../components/Sidebar'
import Create from '../components/Create'


const NewTask = () => {
    return (
        <div className='flex h-screen w-screen p-6 gap-4'>
            <Sidebar />
            <Create />
        </div>
    )
}

export default NewTask