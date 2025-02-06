import React, { useState } from 'react';
import login_sidebar from '../assets/login_sidebar.jpg';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Name:', formData.name);
        console.log('Email:', formData.email);
        console.log('Password:', formData.password);
        try {
            const response = await fetch('https://sparktodo.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Signup successful! You can now log in.");
            } else {
                setMessage(data.msg || "Signup failed");
            }
        } catch (error) {
            setMessage("Error connecting to server");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat" style={{ userSelect: "none" }}>
                <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">


                    <div className="flex flex-col justify-center p-8 md:p-14">
                        <h2 className="mb-3 text-center text-4xl font-bold md:text-[3.3rem]">
                            Sign Up
                        </h2>
                        {message && <p className="text-center text-red-500">{message}</p>}

                        <div className="pt-4">
                            <label className="mb-2 text-md">Enter Your Username</label>
                            <input
                                type="text"
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


                        <div className="py-4 relative">
                            <label className="mb-2 text-md">Password (6 or more characters)</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-[50%] right-3 transform text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full border bg-black text-white p-2 rounded-md mb-6 hover:bg-white hover:text-black hover:border-gray-300"
                        >
                            Sign up
                        </button>

                        <p className="font-light text-center text-gray-400 mb-8">
                            Already have an account?
                            <Link to="/login">
                                <span className="font-bold text-black cursor-pointer"> Sign in</span>
                            </Link>
                        </p>
                    </div>


                    <div className="relative hidden md:block">
                        <img
                            src={login_sidebar}
                            alt="Login Sidebar"
                            className="w-[400px] h-full rounded-r-2xl object-cover"
                            style={{ userSelect: "none", pointerEvents: "none" }}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Signup;
