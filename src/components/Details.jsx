import React, { useState } from "react";
import { ImCross } from "react-icons/im";

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
            className={`w-[25%] bg-gray-200 rounded-xl min-h-[93%] shadow-lg transition-all duration-300 ease-in-out 
                ${isRemoving ? "opacity-0 scale-95 translate-x-10" : "opacity-100 scale-100 translate-x-0"}`}
        >
            <div className="flex p-4 justify-between items-center">
                <h1 className="text-2xl font-bold font-sans whitespace-nowrap">Task:</h1>
                <ImCross
                    className="text-md cursor-pointer text-gray-400"
                    onClick={handleClose}
                />
            </div>
        </div>
    );
};

export default Details;
