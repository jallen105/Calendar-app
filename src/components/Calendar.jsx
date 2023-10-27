import { useState } from 'react'

function Calendar () {

    //variable to store the selected date
    const [sDate, setsDate] = useState(new Date())

    //function to find total days of the current month
    const findMonthDays = (year, month) => {
        return new Date(year, month + 1, 0).getDate()
    }

    //function to find the first day of the current month
    const findFirstDay = (year, month) => {
        return new Date(year, month, 1).getDay()
    }

    //a function to go to previous month
    const changeToPrevMonth = () => {
        setsDate((pDate) => {
            const pMonth = pDate.getMonth() - 1
            const pYear = pDate.getFullYear()
            return new Date(pYear, pMonth)
        }
        )
    }

    //change to next month
    const changeToNextMonth = () => {
        setsDate((pDate) => {
            const pMonth = pDate.getMonth() + 1
            const pYear = pDate.getFullYear()
            return new Date(pYear, pMonth)
        }
        )
    }

    //change selected date when user clicks
    const handleDateClick = (date) => {
        setsDate(date)
    }

    //function to show the calendar
    const showCalendar = () => {
        const currDate = new Date()
        const year = sDate.getFullYear()
        const month = sDate.getMonth()
        const monthDays = findMonthDays(year, month)
        const firstDay = findFirstDay(year, month)

        const allDays = []

        //generate empty cells
        for (let p = 0; p < firstDay; p++) {
            allDays.push(<div key={`em-${p}`} className='box empty'></div>)
        }

        // show days
        for (let d = 1; d <= monthDays; d++) {
            const date = new Date(year, month, d)
            const isSelected = sDate && date.toDateString() === sDate.toDateString()

            allDays.push(
                <div
                    key={`d-${d}`}
                    className={`box ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    {d}
                </div>
            )
        }

        return allDays
    }

    return (
        <div>
        <h3>
           Creating the <i> calendar component </i> from scratch using React JS
        </h3>
        <div className = "main">
           <div className = "header">
              <button onClick = {changeToPrevMonth}> {'<'} </button>
              <h2>
                 {sDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                 })}
              </h2>
              <button onClick = {changeToNextMonth}> {'>'} </button>
           </div>
           <div className = "body">{showCalendar()} </div>
              {sDate && (
                 <div className = "selected-date">
                    Selected Date: {sDate.toLocaleDateString()}
                 </div>
              )}
           </div>

        </div>
    )
}

export default Calendar