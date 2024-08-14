export default function Day({ day }: { day: Date }) {
    return (
        <div className="day">
            <div className="day-header">
                <div className="week-name">
                    {day.toLocaleString(undefined, {
                        weekday: "short",
                    })}
                </div>
                <div className="day-number">{day.getDate()}</div>
                <button className="add-event-btn">+</button>
            </div>
        </div>
    );
}
