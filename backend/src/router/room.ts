import { Router } from "express"
import isAuthorized from "../middleware/isLoggedIn";
import { addPlayer, createRoom, removePlayer, showRoom } from "../controller/roomController";

const room   = Router();

room.post('/create',isAuthorized,createRoom)

room.post('/addplayer',isAuthorized,addPlayer)

room.post('/removeplayer',isAuthorized,removePlayer)

room.get('/currentroom',isAuthorized,showRoom)

export default room;