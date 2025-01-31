import React, { useState } from 'react';
import login_sidebar from '../assets/login_sidebar.jpg';
import { Link } from "react-router-dom";


const Signup = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', formData.email);
        console.log('Password:', formData.password);
    };



    return (
        <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat" style={{
            userSelect: "none",
        }}>
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">

                <div className="flex flex-col justify-center p-8 md:p-14">
                    <h2 className="mb-3 text-center text-4xl font-bold md:text-[3.3rem]">
                        Sign Up
                    </h2>


                    <div className="pt-4">
                        <label className="mb-2 text-md">Enter Your Username</label>
                        <input
                            type="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        />
                    </div>


                    <div className="pt-4">
                        <label className="mb-2 text-md">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        />
                    </div>


                    <div className="py-4">
                        <label className="mb-2 text-md">Password (6 or more characters)</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" />
                    </div>



                    <div className="py-4">
                        <label className="mb-2 text-md">Confirm Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" />
                    </div>



                    <button
                        type="submit"
                        className="w-full border bg-black text-white p-2 rounded-md mb-6 hover:bg-white hover:text-black hover:border-gray-300"
                    >
                        Sign up
                    </button>

                    <p className="font-light text-center text-gray-400 mb-8">
                        Already have an account? <span className="font-bold text-black cursor-pointer"
                            >  sign in</span>
                    </p>
                    

                    <div className="text-center text-gray-400 flex justify-evenly">
                        Don't have an account?
                        <Link to="/signup">
                            <span className="font-bold text-black cursor-pointer"
                            >  Sign up for free</span>
                        </Link>

                    </div>
                </div>

                <div className="relative hidden md:block">
                    <img
                        src={login_sidebar}
                        alt="Login Sidebar"
                        className="w-[400px] h-full rounded-r-2xl object-cover"
                        style={{
                            userSelect: "none",
                            pointerEvents: "none",
                        }}
                    />
                </div>
            </div>
        </div>
    </form>

    );
};

export default Signup;
