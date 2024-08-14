import { isSameMonth, isToday } from "date-fns";
import { useState } from "react";
import AddEventModal from "./AddEventModal";

type DayProps = {
    day: Date;
    selectedMonth: Date;
};

export default function Day({ day, selectedMonth }: DayProps) {
    const [showAddModal, setShowAddModal] = useState(false);
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
                <button
                    onClick={() => setShowAddModal(true)}
                    className="add-event-btn"
                >
                    +
                </button>
            </div>
            {showAddModal && (
                <AddEventModal
                    date={day}
                    closeModal={() => {
                        setShowAddModal(false);
                    }}
                ></AddEventModal>
            )}
        </div>
    );
}
