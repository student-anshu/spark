import React from 'react';
import { IoAddOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";

const Main = () => {
  return (
    <div className='flex-grow p-4'>
      <div className="flex mt-1 ml-4 justify-between items-center">
        <h1 className="text-2xl sm:text-3xl text-gray-800 font-bold font-sans whitespace-nowrap">Today 5</h1>
      </div>
      <div className='ml-3 px-3 py-2 mt-3 cursor-pointer bg-gray-200 rounded-md flex items-center hover:bg-gray-300 transition duration-200'>
        <h1 className='ml-2 sm:ml-5 font-semibold flex items-center text-gray-600'>
          <IoAddOutline className='text-gray-700 text-xl font-bold mr-2' />
          Add New Subtask
        </h1>
      </div>

      {["Research content ideas", "Create a database of guest authors", "Renew driver's licence"].map((task, index) => (
        <div key={index} className="Checkbox ml-3 px-3 py-2 mt-3 cursor-pointer bg-gray-200 rounded-md flex items-center justify-between hover:bg-gray-300 transition duration-200">
          <div className='flex gap-2 px-2 sm:px-4 items-center'>
            <input type="checkbox" id={`task-${index}`} className='cursor-pointer' />
            <label htmlFor={`task-${index}`} className="text-gray-700 text-sm sm:text-base cursor-pointer">{task}</label>
          </div>
          <FaAngleRight className='text-gray-600' />
        </div>
      ))}
    </div>
  );
}

export default Main;