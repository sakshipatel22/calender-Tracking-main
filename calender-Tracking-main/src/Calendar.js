import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// Sample events
const initialEvents = [
  { id: '1', title: 'Meeting with Example Company', date: '2025-01-05' },
  { id: '2', title: 'LinkedIn Post for Another Co.', date: '2025-01-02' },
  { id: '3', title: 'Email to ABC Inc.', date: '2025-01-08' },
]

function CalendarPage() {
  const [events, setEvents] = useState(initialEvents)

  const handleDateSelect = (selectInfo) => {
    // Example: prompt for a new event
    const title = prompt('Enter a new event title:')
    const calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
    }
  }

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Delete event '${clickInfo.event.title}' ?`)) {
      clickInfo.event.remove()
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        // other options...
      />
    </div>
  )
}

export default CalendarPage
