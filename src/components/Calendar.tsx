import {
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isBefore,
    endOfDay,
    isToday,
    subMonths,
    addMonths,
    isSameDay,
    parse,
} from "date-fns";
import { useMemo, useState } from "react";

export default function Calendar() {
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const calendarDays = useMemo(() => {
        const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
        const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
        return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
    }, [selectedMonth]);

    console.log(calendarDays);

    return (
        <div className="calendar">
            <div className="header">
                <button className="btn">Today</button>
                <div>
                    <button className="month-change-btn">&lt;</button>
                    <button className="month-change-btn">&gt;</button>
                </div>
                <span className="month-title">
                    {`${selectedMonth.toLocaleString(undefined, {
                        month: "long",
                    })} ${selectedMonth.getFullYear()}
                    `}
                </span>
            </div>
            <div className="days">
                {calendarDays.map((day) => {
                    return (
                        <div className="day">
                            <div className="day-header">
                                <div className="week-name">
                                    {day.toLocaleString(undefined, {
                                        weekday: "short",
                                    })}
                                </div>
                                <div className="day-number">
                                    {day.getDate()}
                                </div>
                                <button className="add-event-btn">+</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
