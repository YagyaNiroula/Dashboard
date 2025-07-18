// Import React and state management
import React, { useState } from "react";
import "./CalendarWidget.css";

// Calendar widget component for browsing dates
const CalendarWidget = () => {
  // Track which month/year is currently being displayed
  const [currentDate, setCurrentDate] = useState(new Date());
  // Track which date the user has clicked on
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calculate how many days are in the current month and what day of week it starts on
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1); // First day of the month
    const lastDay = new Date(year, month + 1, 0); // Last day of the month
    const daysInMonth = lastDay.getDate(); // Total number of days
    const startingDay = firstDay.getDay(); // What day of week the month starts on (0=Sunday)
    
    return { daysInMonth, startingDay };
  };

  // Move to previous or next month when user clicks navigation arrows
  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction); 
      return newDate;
    });
  };

  // Convert a date to a string format for comparison
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Build the calendar grid with all the days
  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];
    
    // Adding empty cells for days before the first day of the month (to align calendar properly)
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Adding all the days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = formatDate(date);
      const isToday = formatDate(new Date()) === dateKey; // Check if this is today
      const isSelected = formatDate(selectedDate) === dateKey; // Check if user clicked this date
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="day-number">{day}</span>
        </div>
      );
    }
    
    return days;
  };



  // Array of month names for display
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Array of day names for the calendar header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar-widget">
      <div className="widget-header">
        <h3>Calendar</h3>
        <div className="calendar-nav">
          <button onClick={() => navigateMonth(-1)} className="nav-btn">‹</button>
          <span className="current-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={() => navigateMonth(1)} className="nav-btn">›</button>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          {dayNames.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}
        </div>
        
        <div className="calendar-grid">
          {renderCalendar()}
        </div>
      </div>


    </div>
  );
};

export default CalendarWidget; 