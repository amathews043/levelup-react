import React, {useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"

export const EventList = () => {
    const [events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`game--${event.id}`} className='event'> 
                    <div className="event__game"> {event.game.title}</div>
                    <div className="event__game"> {event.date}</div>
                    <div className="event__players"> players needed: {event.game.num_of_players}</div>
                    <div className="event__attendees"> {event.attendees.length} player RSVPed</div>
                    </section>
                })
            }
        </article>
    )
}