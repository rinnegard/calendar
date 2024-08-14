import { FormEvent, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { Event, EventContext } from "../App";

type AddEventModalProps = {
    date: Date;
    closeModal: () => void;
};

export default function AddEventModal({
    date,
    closeModal,
}: AddEventModalProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const allDayRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const endTimeRef = useRef<HTMLInputElement>(null);

    const events = useContext(EventContext);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (nameRef.current == undefined || allDayRef.current == undefined) {
            return;
        }

        const newEvent: Event = {
            id: crypto.randomUUID(),
            date: date,
            name: nameRef.current?.value,
            allDay: allDayRef.current?.checked,
            startTime: startTimeRef.current?.value,
            endTime: endTimeRef.current?.value,
            color: "red",
        };

        events?.addEvent(newEvent);

        closeModal();
    }

    return createPortal(
        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-body">
                <div className="modal-title">
                    <div>Add Event</div>
                    <small>
                        {date.toLocaleDateString(undefined, {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                        })}
                    </small>
                    <button onClick={closeModal} className="close-btn">
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            ref={nameRef}
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div className="form-group checkbox">
                        <input
                            ref={allDayRef}
                            type="checkbox"
                            name="all-day"
                            id="all-day"
                        />
                        <label htmlFor="all-day">All Day?</label>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="start-time">Start Time</label>
                            <input
                                ref={startTimeRef}
                                type="time"
                                name="start-time"
                                id="start-time"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="end-time">End Time</label>
                            <input
                                ref={endTimeRef}
                                type="time"
                                name="end-time"
                                id="end-time"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Color</label>
                        <div className="row left">
                            <input
                                type="radio"
                                name="color"
                                value="blue"
                                id="blue"
                                className="color-radio"
                            />
                            <label htmlFor="blue">
                                <span className="sr-only">Blue</span>
                            </label>
                            <input
                                type="radio"
                                name="color"
                                value="red"
                                id="red"
                                className="color-radio"
                            />
                            <label htmlFor="red">
                                <span className="sr-only">Red</span>
                            </label>
                            <input
                                type="radio"
                                name="color"
                                value="green"
                                id="green"
                                className="color-radio"
                            />
                            <label htmlFor="green">
                                <span className="sr-only">Green</span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn btn-success" type="submit">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.querySelector("#modal-container") as HTMLElement
    );
}
