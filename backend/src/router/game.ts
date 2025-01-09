import { Router } from "express";
import { getWord } from "../controller/offlineGame";

const offlinegame = Router();

offlinegame.get('/game',getWord)

export default offlinegame;