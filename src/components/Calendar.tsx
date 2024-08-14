import {
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    eachDayOfInterval,
    // isSameMonth,
    // isBefore,
    // endOfDay,
    // isToday,
    subMonths,
    addMonths,
    // isSameDay,
    // parse,
} from "date-fns";
import { useMemo, useState } from "react";
import Day from "./Day";

export default function Calendar() {
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const calendarDays = useMemo(() => {
        const firstWeekStart = startOfWeek(startOfMonth(selectedMonth), {
            weekStartsOn: 1,
        });
        const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth), {
            weekStartsOn: 1,
        });
        return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
    }, [selectedMonth]);

    function resetMonth() {
        setSelectedMonth(new Date());
    }

    function incrementMonth() {
        setSelectedMonth((prevSelectedMonth) => {
            return new Date(addMonths(prevSelectedMonth, 1));
        });
    }

    function decrementMonth() {
        setSelectedMonth((prevSelectedMonth) => {
            return new Date(subMonths(prevSelectedMonth, 1));
        });
    }

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={resetMonth} className="btn">
                    Today
                </button>
                <div>
                    <button
                        onClick={decrementMonth}
                        className="month-change-btn"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={incrementMonth}
                        className="month-change-btn"
                    >
                        &gt;
                    </button>
                </div>
                <span className="month-title">
                    {`${selectedMonth.toLocaleString(undefined, {
                        month: "long",
                    })} ${selectedMonth.getFullYear()}
                    `}
                </span>
            </div>
            <div className="days">
                {calendarDays.map((day, index) => {
                    return (
                        <Day
                            key={index}
                            day={day}
                            selectedMonth={selectedMonth}
                        />
                    );
                })}
            </div>
        </div>
    );
}
