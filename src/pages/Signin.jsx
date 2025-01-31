import React, { useState } from 'react';
import login_sidebar from '../assets/login_sidebar.jpg';
import { Link, useNavigate } from "react-router-dom";


const Signin = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email:', formData.email);
        console.log('Password:', formData.password);

        try {
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Login successful!");
                navigate('/'); // Redirect after login
            } else {
                setMessage(data.msg || "Login failed");
            }
        } catch (error) {
            setMessage("Error connecting to server");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat" style={{
                userSelect: "none",
            }}>
                <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">

                    <div className="flex flex-col justify-center p-8 md:p-14">
                        <h2 className="mb-3 text-center text-4xl font-bold md:text-[3.3rem]">
                            Welcome back
                        </h2>
                        {message && <p className="text-center text-red-500">{message}</p>}

                        <p className="font-light text-center text-gray-400 mb-8">
                            Welcome back! Please enter your details
                        </p>

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
                            <label className="mb-2 text-md">Password</label>
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
                            Sign in
                        </button>

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

export default Signin;
