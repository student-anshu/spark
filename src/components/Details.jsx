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
            className={`w-[25%] bg-gray-200 rounded-xl min-h-[93%] shadow-lg transition-all duration-300 ease-in-out 
                ${isRemoving ? "opacity-0 scale-95 translate-x-10" : "opacity-100 scale-100 translate-x-0"}`}
        >
            <div className="flex p-4 justify-between items-center">
                <h1 className="text-2xl text-gray-700  font-bold font-sans whitespace-nowrap">Task:</h1>
                <ImCross
                    className="text-md cursor-pointer text-gray-400"
                    onClick={handleClose}
                />
            </div>
            <div className="w-full flex justify-between items-center py-2 rounded-md left-2 bg-transparent border border-gray-300 ">
             <input className="px-4 outline-none" type="text" placeholder="Renew driver's license" />
            </div>

            <div className="w-full h-[15%]  mt-2  py-2 rounded-md left-2 bg-transparent border border-gray-300 flex items-start">
             <input className="px-4 outline-none w-full" type="text" placeholder= "Description" />
            </div>
            <div className="flex items-center  mt-3 "> 
                <h2 className="px-4"> List</h2>
                <select name="" id="" className=" gp-3 bg-gray-300 rounded-md px-3 py-1 " >
                    <option value="" >Personal</option>
                    <option value="" >Others</option>
                    
                </select>
            </div>

            <div className="flex items-center mt-3 "> 
                <h2 className="px-4"> Due date</h2>
               <input className=" gp-3 bg-gray-300 rounded-md px-3 py-1 " type="date"></input>
            </div>

            <div className=" flex items-center mt-3 "> 
                <h2 className="px-4"> Tags</h2>
                <div className='ml-5 px-2 py-0.5 mt-1 cursor-pointer bg-sky-300 rounded-md flex items-center'>
      <h1 className='font-semibold text-gray-600'>Tag 2</h1>
      </div> 

       <div className=' ml-3 px-2 py-0.5 mt-1  cursor-pointer bg-gray-300 rounded-md  flex items-center'>
                           <h1 className='font-semibold flex items-center justify-center text-gray-600'> 
      <IoAddOutline className='text-gray-700 text-xl font-bold ' />
                              Add Tag</h1>
                      </div>

            </div>

            <div className="flex p-4 justify-between items-center">
            <h1 className="text-2xl text-gray-700 font-bold font-sans whitespace-nowrap">Subtask:</h1>
            </div>

            
       <div className=' ml-3 px-2 py-2 mt-1  cursor-pointer bg-gray-300 rounded-md  flex items-center'>
                           <h1 className='ml-5 font-semibold flex items-center justify-center text-gray-600'> 
      <IoAddOutline className='text-gray-700 text-xl font-bold ' />
                              Add New Subtask</h1>
                      </div>
                      <hr className=' text-gray-100'></hr>
                      <div className="Checkbox ml-10 flex items-center mt-3 ">
                      <input type="checkbox" name="age"></input>   
                      <label for="age" className="ml-3 text-gray-700">Subtask</label>
                      </div>
            <div className="button flex items-center mt-35 ">

            <button className="bg-gray-300 ml-10 px-5 py-2 rounded-md text-medium font-semibold text-gray-700">Delete Task</button> 
            <button className="bg-yellow-300 ml-5 px-5 py-2 rounded-md text-medium font-semibold text-gray-700">Save Changes</button> 

            </div>          
                   
        </div>
    );
};

export default Details;


