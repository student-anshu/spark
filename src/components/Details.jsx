import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { IoAddOutline } from "react-icons/io5";

const Details = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleClose = () => {
        setIsRemoving(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`flex flex-col justify-between p-4 w-full sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[22%] bg-gray-200 rounded-xl min-h-[93%] shadow-lg transition-all duration-300 ease-in-out 
                ${isRemoving ? "opacity-0 scale-95 translate-x-10" : "opacity-100 scale-100 translate-x-0"}`}
        >
            <div>
                <div className="flex p-4 pt-0 justify-between items-center">
                    <h1 className="text-2xl text-gray-700 font-bold font-sans whitespace-nowrap">Task:</h1>
                    <ImCross
                        className="text-md cursor-pointer text-gray-400"
                        onClick={handleClose}
                    />
                </div>
                <div className="w-full flex justify-between items-center py-2 rounded-md bg-transparent border border-gray-300">
                    <input
                        className="px-4 outline-none w-full bg-transparent"
                        type="text"
                        placeholder="Renew driver's license"
                    />
                </div>

                <div className="w-full h-32 mt-2 py-2 rounded-md bg-transparent flex items-start">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm resize-none h-32"
                        placeholder="Description"
                    ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center mt-3">
                    <h2 className="pr-4">List</h2>
                    <select className="bg-gray-300 rounded-md px-3 py-1 w-full sm:w-auto">
                        <option value="">Personal</option>
                        <option value="">Others</option>
                    </select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center mt-3">
                    <h2 className="pr-4">Due date</h2>
                    <input className="bg-gray-300 rounded-md px-3 py-1 w-full sm:w-auto" type="date"></input>
                </div>
            </div>

            <div className="button flex flex-col items-center mt-5 gap-4">
                <button className="bg-red-500 px-5 py-2 rounded-md text-medium font-semibold text-gray-700 w-full">
                    Delete Task
                </button>
                <button className="bg-yellow-300 px-5 py-2 rounded-md text-medium font-semibold text-gray-700 w-full">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Details;
