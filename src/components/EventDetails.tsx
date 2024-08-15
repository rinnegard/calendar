import { Event } from "../App";

export default function EventDetails({ event }: { event: Event }) {
    return event.allDay ? (
        <button className={`all-day-event event ${event.color}`}>
            <div className="event-name">{event.name}</div>
        </button>
    ) : (
        <button className="event">
            <div className={`color-dot ${event.color}`}></div>
            <div className="event-time">{event.startTime}</div>
            <div className="event-name">{event.name}</div>
        </button>
    );
}
