import React from 'react';
import Sidebar from '../components/Sidebar';
import Upcoming from '../components/Upcoming';

const Up = () => {
    return (
        <div className='flex h-screen w-screen p-6 gap-4'>
            <Sidebar />
            <Upcoming />
        </div>
    );
}

export default Up;
