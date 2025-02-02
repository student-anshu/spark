import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [calendarTitle, setCalendarTitle] = useState('Calendar');
    const calendarRef = useRef(null);

    useEffect(() => {
        const sampleEvents = [
            { title: 'Event 1', date: '2025-01-01', extendedProps: { priority: 'high' } },
            { title: 'Event 2', date: '2025-02-14', extendedProps: { priority: 'medium' } },
            { title: 'Event 3', date: '2025-03-17', extendedProps: { priority: 'low' } },
            { title: 'Event 4', date: '2025-04-01', extendedProps: { priority: 'high' } },
            { title: 'Event 5', date: '2025-05-05', extendedProps: { priority: 'medium' } },
            { title: 'Event 6', date: '2025-06-21', extendedProps: { priority: 'low' } },
            { title: 'Event 7', date: '2025-07-04', extendedProps: { priority: 'high' } },
            { title: 'Event 8', date: '2025-08-15', extendedProps: { priority: 'medium' } },
            { title: 'Event 9', date: '2025-09-10', extendedProps: { priority: 'low' } },
            { title: 'Event 10', date: '2025-10-31', extendedProps: { priority: 'high' } },
            { title: 'Event 11', date: '2025-11-26', extendedProps: { priority: 'medium' } },
            { title: 'Event 12', date: '2025-12-25', extendedProps: { priority: 'low' } },
        ];

        setEvents(sampleEvents);
    }, []);

    const updateTitle = () => {
        if (calendarRef.current) {
            setCalendarTitle(calendarRef.current.getApi().view.title);
        }
    };

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

    const eventContent = (eventInfo) => {
        const priority = eventInfo.event.extendedProps?.priority;

        let bgColor = "bg-blue-500";
        if (priority === 'high') bgColor = "bg-red-600";
        if (priority === 'medium') bgColor = "bg-yellow-400";
        if (priority === 'low') bgColor = "bg-green-400";

        return (
            <div className={`text-white font-bold rounded-sm p-2 ${bgColor}`}>
                <div>{eventInfo.event.title}</div>
                <div className="text-xs mt-1">{`Priority: ${priority}`}</div>
            </div>
        );
    };




    return (
        <div className="p-4 pt-0 w-full lg:w-[60%] flex-grow">
            <div className='flex flex-col sm:flex-row justify-between items-center'>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center sm:text-left">{calendarTitle}</h1>
                <div className='mt-2 sm:mt-0 py-2 px-6 rounded-md border border-gray-200 cursor-pointer'>Add New</div>
            </div>
            <div className="">
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

                <div className="h-[70vh] p-2">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        headerToolbar={false}
                        height="auto"
                        eventContent={eventContent}
                        datesSet={updateTitle}
                    />

                </div>
            </div>
        </div>
    );
};

export default Calendar;
