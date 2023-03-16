import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function MyCalendar() {
    const [startDate, setStartDate] = useState(new Date());
  
    return (
      <div>
        <h3>My Calendar</h3>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
    );
  }

  export default MyCalendar;
  