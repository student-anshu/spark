import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { motion } from 'framer-motion';

const EventDetails = ({ event, onClose, refreshEvents }) => {
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [completed, setCompleted] = useState(event.completed);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No authentication token found");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://todo-spark.onrender.com:5000/api/tasks/${event.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, completed }),
            });

            if (!response.ok) {
                throw new Error("Failed to update event");
            }

            alert("Event updated successfully!");
            window.location.reload();
            refreshEvents(); // Ensure the parent re-fetches the events
            onClose(); // Close the panel after saving
        } catch (error) {
            console.error("Error updating event:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] bg-white shadow-xl z-50 flex flex-col p-6"
        >
            <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <h1 className="text-xl font-semibold text-gray-700">Edit Event</h1>
                <ImCross className="text-gray-500 cursor-pointer" onClick={onClose} />
            </div>

            <div className="mt-4">
                <label className="text-gray-600 font-medium">Event Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div className="mt-4">
                <label className="text-gray-600 font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-400 outline-none h-28"
                ></textarea>
            </div>

            <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => setCompleted(!completed)}
                    className="mr-2"
                />
                <span>Completed</span>
            </div>

            <div className="flex flex-col gap-4 mt-6">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="py-2 rounded-md font-medium bg-yellow-300 hover:bg-yellow-400"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                    onClick={onClose}
                    className="py-2 rounded-md font-medium bg-gray-300 hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </motion.div>
    );
};

export default EventDetails;
