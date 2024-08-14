import { isSameMonth, isToday, isSameDay } from "date-fns";
import { useContext, useState } from "react";
import AddEventModal from "./AddEventModal";
import { EventContext } from "../App";

type DayProps = {
    day: Date;
    selectedMonth: Date;
};

export default function Day({ day, selectedMonth }: DayProps) {
    const [showAddModal, setShowAddModal] = useState(false);
    const { events } = useContext(EventContext);

    const thisDayEvents = events.filter((event) => {
        if (isSameDay(event.date, day)) {
            return event;
        }
    });

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
            <div className="events">
                {thisDayEvents.map((event) => {
                    return event.allDay ? (
                        <button className="all-day-event blue event">
                            <div className="event-name">{event.name}</div>
                        </button>
                    ) : (
                        <button className="event">
                            <div className={`color-dot ${event.color}`}></div>
                            <div className="event-time">{event.startTime}</div>
                            <div className="event-name">{event.name}</div>
                        </button>
                    );
                })}
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
