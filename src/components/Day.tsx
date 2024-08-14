import { isSameMonth, isToday, isSameDay } from "date-fns";
import { useContext, useState } from "react";
import AddEventModal from "./AddEventModal";
import { EventContext } from "../App";
import EventDetails from "./EventDetails";

type DayProps = {
    day: Date;
    selectedMonth: Date;
};

export default function Day({ day, selectedMonth }: DayProps) {
    const [showAddModal, setShowAddModal] = useState(false);
    const { events } = useContext(EventContext);

    const thisDayEvents = events.filter((event) => {
        return isSameDay(event.date, day);
    });

    const fullDayEvents = thisDayEvents.filter((event) => {
        return event.allDay;
    });

    const partialDayEvents = thisDayEvents
        .filter((event) => {
            return !event.allDay;
        })
        .sort((a, b) => {
            if (a.startTime == undefined || b.startTime == undefined) {
                return 0;
            }
            return a.startTime?.localeCompare(b.startTime);
        });

    const sortedEvents = [...fullDayEvents, ...partialDayEvents];

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
                {sortedEvents.map((event) => {
                    return <EventDetails event={event}></EventDetails>;
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
