import React from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import Details from '../components/Details'

const Home = () => {
    return (
        <div className='flex h-screen w-screen'>
            <Sidebar />
            <Main />
            <Details />
        </div>
    )
}

export default Home