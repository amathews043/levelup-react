import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/game/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/game/EventForm" 


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/games" element={<GameList />} />
                <Route path="/events" element={<EventList/>}/>
                <Route path="/gameform" element={<GameForm/>}/>
                <Route path="/newGames" element={<GameForm />} />
                <Route path="/editGame/:gameId" element={<GameForm/>} />
                <Route path="/newEvent" element={<EventForm />} />
                <Route path="/editEvent/:eventId" element={<EventForm/>} />
                
            </Route>
        </Routes>
    </>
}