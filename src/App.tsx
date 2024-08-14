import { createContext, useState } from "react";
import Calendar from "./components/Calendar";
import "./styles.css";

export type Event = {
    id: string;
    date: Date;
    name: string;
    allDay: boolean;
    startTime?: string;
    endTime?: string;
    color: "red" | "blue" | "green";
};

export type EventContextType = {
    events: Event[];
    addEvent: (event: Event) => void;
};

export const EventContext = createContext<EventContextType>({
    events: [],
    addEvent: () => {},
});

function App() {
    const [events, setEvents] = useState<Event[]>([]);
    return (
        <EventContext.Provider
            value={{
                events: events,
                addEvent: (event: Event) => {
                    setEvents((prevEvents) => {
                        return [...prevEvents, event];
                    });
                },
            }}
        >
            <Calendar></Calendar>
        </EventContext.Provider>
    );
}

export default App;
