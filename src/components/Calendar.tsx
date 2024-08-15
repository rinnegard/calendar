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
import { useMemo, useReducer } from "react";
import Day from "./Day";

type ActionTypes = "addMonth" | "removeMonth" | "reset";

function reducer(state: Date, action: { type: ActionTypes }) {
    switch (action.type) {
        case "addMonth":
            return new Date(addMonths(state, 1));
        case "removeMonth":
            return new Date(subMonths(state, 1));
        case "reset":
            return new Date();
        default:
            throw new Error("No action found");
    }
}

export default function Calendar() {
    // const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedMonth, dispatch] = useReducer(reducer, new Date());

    const calendarDays = useMemo(() => {
        const firstWeekStart = startOfWeek(startOfMonth(selectedMonth), {
            weekStartsOn: 1,
        });
        const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth), {
            weekStartsOn: 1,
        });
        return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
    }, [selectedMonth]);

    return (
        <div className="calendar">
            <div className="header">
                <button
                    onClick={() => {
                        dispatch({ type: "reset" });
                    }}
                    className="btn"
                >
                    Today
                </button>
                <div>
                    <button
                        onClick={() => {
                            dispatch({ type: "removeMonth" });
                        }}
                        className="month-change-btn"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={() => {
                            dispatch({ type: "addMonth" });
                        }}
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
