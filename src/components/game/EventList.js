import React, {useEffect, useState } from "react"
import { getEvents, leaveEvent, joinEvent } from "../../managers/EventManager"
import { useNavigate, Link } from "react-router-dom"
import "./Game.css" 

export const EventList = () => {
    const [events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const deleteEvent = (id) => {
        return fetch(`http://localhost:8000/events/${id}`, {
            method: "DELETE", 
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
        }).then(() => getEvents().then(data => setEvents(data)))
    }

    const joinButton = (eventId) => {
        joinEvent(eventId).then(()=> {
            getEvents().then(data => setEvents(data))
        })
    }

    const leaveButton = (eventId) => {
        leaveEvent(eventId).then(() => {
            getEvents().then(data => setEvents(data))
        })
    }

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
        navigate({ pathname: "/newEvent" })
        }}
>Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className='event'> 
                    <div className="event__game"> {event.game.title}</div>
                    <div className="event__date"> {event.date}</div>
                    <div className="event__description"> {event.description}</div>
                    <div className="event__players"> players needed: {event.game.num_of_players}</div>
                    <div className="event__attendees"> {event.attendees.length} player RSVPed</div>
                    <button id="edit-button" className="button is-link"><Link className="link" to={`/editEvent/${event.id}`}> Edit Event  </Link> </button>
                    <button id="edit-button" className="button is-link button-delete" onClick={() => deleteEvent(event.id)}> Delete Event  </button>
                    {
                        event.joined ? <button id="edit-button" className="button is-link button-delete" onClick={() => leaveButton(event.id)}> Leave Event  </button>
                        : 
                        <button id="edit-button" className="button is-link button-delete" onClick={() => joinButton(event.id)}> Join Event  </button>
                    }
                    </section>
                })
            }
        </article>
    )
}