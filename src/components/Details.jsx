import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const Details = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div
            className={`w-[25%] bg-gray-200 rounded-xl min-h-[93%] shadow-lg transition-all duration-300 
                ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 scale-95 hidden"}`}
        >
            <div className="flex p-4 justify-between items-center">
                <h1 className="text-2xl font-bold font-sans whitespace-nowrap">Task:</h1>
                <ImCross
                    className="text-md cursor-pointer text-gray-400"
                    onClick={() => setIsVisible(false)}
                />
            </div>
        </div>
    );
};

export default Details;
