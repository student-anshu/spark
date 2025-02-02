import React from 'react'

const Create = () => {
    return (
        <div className='w-full flex flex-col flex-grow justify-between'>
            <div>
                <h1 className='text-4xl font-bold'>Create a task</h1>
                <div className="flex p-4 pt-0 justify-between items-center">
                </div>
                <div className="w-full flex justify-between items-center py-2 rounded-md bg-transparent border border-gray-300">
                    <input
                        className="px-4 outline-none w-full bg-transparent"
                        type="text"
                        placeholder="Title"
                    />
                </div>

                <div className="w-full h-64
                 mt-2 py-2 rounded-md bg-transparent flex items-start">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm resize-none h-64"
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
                <div className="flex flex-col sm:flex-row sm:items-center mt-3">
                    <h2 className="pr-4">Priority</h2>
                    <select className="bg-gray-300 rounded-md px-3 py-1 w-full sm:w-auto">
                        <option value="">Low</option>
                        <option value="">Medium</option>
                        <option value="">High</option>
                    </select>
                </div>
            </div>

            <div className="button flex flex-col items-center mt-5 gap-4">
                <button className="bg-blue-500 px-5 py-2 rounded-md text-medium font-semibold text-gray-700 w-full">
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default Create