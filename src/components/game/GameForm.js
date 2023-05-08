import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGameTypes, getGame, editGame } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const {gameId} = useParams()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: "",
        num_of_players: "",
        title: "",
        maker: "",
        game_type: 0
    })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    useEffect(() => {
        getGame(gameId).then(data => setCurrentGame(data))
    }, [gameId])

    const changeGameState = (domEvent) => {
        const copy = {...currentGame}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copy)
    }

    const changeIntState = (domEvent) => {
        const copy = {...currentGame}
        copy[domEvent.target.name] = parseInt(domEvent.target.value)
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            {
                gameId ? <h2 className="gameForm__title"> Edit Game Details </h2>
                : 
                <h2 className="gameForm__title">Register New Game</h2>
            }
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Min - Max Number of Players: </label>
                    <input type="text" name="num_of_players" required autoFocus className="form-control"
                        value={currentGame.num_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Game Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group"> 
                <label htmlFor="game_type"> Game Type: </label>
                <select name="game_type" value={currentGame.game_type} onChange={changeIntState}> 
                <option key='0' value='0'>Please Choose a Game Type </option>
                {
                    gameTypes.map((type) => {
                        return <option value={type.id} key={type.id}>{type.label} </option>
                    })
                }

                </select>
                </div>
            </fieldset>
            {
                gameId ? 
                <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: currentGame.num_of_players,
                        skill_level: currentGame.skill_level,
                        game_type: currentGame.game_type
                    }

                    // Send POST request to your API
                    editGame(game, gameId)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Edit Game</button>
                :
                <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: currentGame.num_of_players,
                        skill_level: currentGame.skill_level,
                        game_type: currentGame.game_type
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
            }

        
        </form>
    )
}