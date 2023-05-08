import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent, getGames, getEvent, editEvent } from "../../managers/EventManager"


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames ] = useState([])
    const {eventId} = useParams()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        game: ""
    })

    useEffect(() => {
        getEvent(eventId).then(data => setCurrentEvent(data))
    }, [eventId])


    const changeEventState = (domEvent) => {
        const copy = {...currentEvent}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copy)
    }

    const editButton = (currentEvent, eventId) => {
        return <button type="submit"
        onClick={evt => {
            // Prevent form from being submitted
            evt.preventDefault()

            const Event = {
                description: currentEvent.description, 
                date: currentEvent.date, 
                game: parseInt(currentEvent.game)
            }

            // Send POST request to your API

            editEvent(Event, eventId)
                .then(() => navigate("/events"))
        }}
        className="btn btn-primary">Submit Edit</button>
    }

    const createButton = (currentEvent) => {
        return <button type="submit"
        onClick={evt => {
            // Prevent form from being submitted
            evt.preventDefault()

            const Event = {
                description: currentEvent.description, 
                date: currentEvent.date, 
                game: parseInt(currentEvent.game)
            }

            // Send POST request to your API

            createEvent(Event)
                .then(() => navigate("/events"))
        }}
        className="btn btn-primary">Create</button>
    }


    return (
        <form className="EventForm">
            {
                eventId ? <h2 className="EventForm__title">Edit Event</h2> : 
                <h2 className="EventForm__title">Register New Event</h2>
            }
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date and Time: </label>
                    <input type="datetime-local" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group"> 
                <label htmlFor="game"> Game:</label>
                <select name="game" value={currentEvent.game} onChange={changeEventState}> 
                <option key='0' value='0'>Please Choose a Game </option>
                {
                    games.map((game) => {
                        return <option value={game.id} key={game.id}>{game.title} </option>
                    })
                }

                </select>
                </div>
            </fieldset>

            {
                eventId ? editButton(currentEvent, eventId)
            : createButton(currentEvent)
            }
        </form>
    )
}