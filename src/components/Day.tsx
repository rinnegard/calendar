import { isSameMonth, isToday } from "date-fns";

export default function Day({
    day,
    selectedMonth,
}: {
    day: Date;
    selectedMonth: Date;
}) {
    return (
        <div
            className={`day ${
                !isSameMonth(day, selectedMonth) && "non-month-day"
            }`}
        >
            <div className="day-header">
                <div className="week-name">
                    {day.toLocaleString(undefined, {
                        weekday: "short",
                    })}
                </div>
                <div className={`day-number ${isToday(day) && "today"}`}>
                    {day.getDate()}
                </div>
                <button className="add-event-btn">+</button>
            </div>
        </div>
    );
}
