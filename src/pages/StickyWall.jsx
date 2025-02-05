import React from 'react'
import Sidebar from '../components/Sidebar'
import Sticky from '../components/Sticky'

const StickyWall = () => {
    return (
        <div className='flex h-screen w-screen p-6 gap-4'>
            <Sidebar />
            <Sticky />
        </div>
    )
}

export default StickyWall