import React from 'react';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import Details from '../components/Details';

const Today = () => {
    return (
        <div className='flex h-screen w-screen p-6 gap-4'>
            <Sidebar />
            <Main />
            <Details />
        </div>
    );
}

export default Today;
