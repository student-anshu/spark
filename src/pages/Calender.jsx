import React from 'react';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/calender';

const Calender = () => {
    return (
        <div className='flex h-screen w-screen p-6 gap-4'>
            <Sidebar />
            <Calendar />
        </div>
    );
};

export default Calender;
