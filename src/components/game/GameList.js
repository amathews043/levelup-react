import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import { useNavigate, Link } from "react-router-dom"
import "./Game.css" 

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const deleteGame = (id) => {
        return fetch(`http://localhost:8000/games/${id}`, {
            method: "DELETE", 
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
        }).then(() => getGames().then(data => setGames(data)))
    }

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/newGames" })
                }}
            >Register New Game</button>
            <div className="flex">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.num_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button id="edit-button" className="button is-link"><Link className="link" to={`/editGame/${game.id}`}> Edit Game  </Link> </button>
                        <button id="edit-button" className="button is-link button-delete" onClick={() => deleteGame(game.id)}> Delete Game  </button>
                    </section>
                })
            }
            </div>
        </article>
    )
}