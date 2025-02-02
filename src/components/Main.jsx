import React from 'react';
import { IoAddOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";

const Main = () => {
    return (
        <div className='flex-grow bg-gray-100 rounded-md p-4'>
              <div className="flex mt-1 ml-4 justify-between items-center">
            <h1 className="text-3xl text-gray-800 font-bold font-sans whitespace-nowrap">Today 5</h1>
            </div>
                   <div className=' ml-3 px-2 py-2 mt-3  cursor-pointer bg-gray-200 rounded-md  flex items-center'>
                                       <h1 className='ml-5 font-semibold flex items-center justify-center text-gray-600'> 
                  <IoAddOutline className='text-gray-700 text-xl font-bold ' />
                                          Add New Subtask</h1>
                                  </div>
                                  <div className="Checkbox ml-3 px-3 py-2 mt-3  cursor-pointer bg-gray-200 rounded-md  flex items-center justify-between">
            <div className='flex gap-2 px-4'>
            <input type="checkbox" name="age" className=''></input>   
                      <label for="age" className=" text-gray-700">Research content ideas</label>
                      
            </div>
                      <FaAngleRight className='font-semibold text-gray-600 ml-104' />
          </div>  

           <div className="Checkbox ml-3 px-3 py-2 mt-3  cursor-pointer bg-gray-200 rounded-md  flex items-center justify-between">
            <div className='flex gap-2 px-4 items-center'>
            <input type="checkbox" name="age" className=''></input>   
                      <label for="age" className=" text-gray-700">Create a database of guest authors</label>
                      
            </div>
                      <FaAngleRight className='font-semibold text-gray-600 ml-104' />
          </div> 
          <div className="Checkbox ml-3 px-3 py-2 mt-3  cursor-pointer bg-gray-200 rounded-md  flex items-center justify-between">
            <div className='flex gap-2 px-4'>
            <input type="checkbox" name="age" className=''></input>   
                      <label for="age" className=" text-gray-700">Renew driver's licence</label>
                      
            </div>
                      <FaAngleRight className='font-semibold text-gray-600 ml-104' />
          </div> 
         
        </div>
    );
}

export default Main;
