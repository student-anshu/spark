import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import EventDetails from './EventDetails'; // Component for editing events

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [calendarTitle, setCalendarTitle] = useState('Calendar');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEventPanelOpen, setIsEventPanelOpen] = useState(false);
    const calendarRef = useRef(null);

    // Fetch tasks from backend
    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("No authentication token found");
                return;
            }

            try {
                const response = await fetch("https://sparktodo.onrender.com/api/tasks", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const data = await response.json();
                // Filter out completed tasks
                setEvents(data.tasks?.filter(task => !task.completed).map(task => ({
                    id: task._id,
                    title: task.title,
                    date: task.dueDate || new Date().toISOString().split('T')[0],
                    completed: task.completed,
                    description: task.description || "No description available"
                })) || []);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Update calendar title on view change
    const updateTitle = () => {
        if (calendarRef.current) {
            setCalendarTitle(calendarRef.current.getApi().view.title);
        }
    };

    // Resize handler for FullCalendar
    const handleResize = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().updateSize();
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Handle event click to open details panel
    const handleEventClick = (clickInfo) => {
        const event = events.find(e => e.id === clickInfo.event.id);
        if (event) {
            setSelectedEvent(event);
            setIsEventPanelOpen(true);
        }
    };

    // Close event details panel
    const closeEventPanel = () => {
        setIsEventPanelOpen(false);
        setSelectedEvent(null);
    };

    // Handle marking task as completed
    const markTaskAsCompleted = async (taskId) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No authentication token found");
            return;
        }

        try {
            const response = await fetch(`https://sparktodo.onrender.com/api/tasks/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: true }),
            });

            if (!response.ok) {
                throw new Error(`Failed to mark task as completed`);
            }

            // After successfully completing the task, reload the page
            window.location.reload(); // Forces page reload to update task status

        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    return (
        <div className="p-4 pt-0 w-full lg:w-[60%] flex-grow">
            {/* Header */}
            <div className='flex flex-col sm:flex-row justify-between items-center'>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center sm:text-left">{calendarTitle}</h1>
            </div>

            {/* Controls */}
            <div className="mt-4">
                <div className='flex flex-col md:flex-row justify-between items-center my-2 md:my-6 gap-4'>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-400" onClick={() => { calendarRef.current.getApi().changeView('dayGridMonth'); updateTitle(); }}>Month</button>
                        <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-400" onClick={() => { calendarRef.current.getApi().changeView('dayGridWeek'); updateTitle(); }}>Week</button>
                        <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-400" onClick={() => { calendarRef.current.getApi().changeView('dayGridDay'); updateTitle(); }}>Day</button>
                    </div>
                    <div className="flex justify-center md:justify-end gap-4 items-center">
                        <button className="px-3 py-1 rounded-md" onClick={() => { calendarRef.current.getApi().prev(); updateTitle(); }}><FaChevronLeft /></button>
                        <button className="px-3 py-1 rounded-md" onClick={() => { calendarRef.current.getApi().next(); updateTitle(); }}><FaChevronRight /></button>
                    </div>
                </div>

                {/* Calendar */}
                <div className="h-[70vh] p-2">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        headerToolbar={false}
                        height="auto"
                        datesSet={updateTitle}
                        eventClick={handleEventClick}
                    />
                </div>
            </div>

            {/* Event Details Panel */}
            {isEventPanelOpen && selectedEvent && (
                <EventDetails event={selectedEvent} onClose={closeEventPanel} />
            )}
        </div>
    );
};

export default Calendar;
