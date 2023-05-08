import React, {useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"
import { useNavigate, Link } from "react-router-dom"
import "./Game.css" 

export const EventList = () => {
    const [events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

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
                    </section>
                })
            }
        </article>
    )
}