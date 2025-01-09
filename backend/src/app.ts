import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { setupSocket } from './config/socket';
import authRouter from './router/auth';
import passport from 'passport';
import offlinegame from './router/game';
import room from './router/room';
import "./config/googleAuth"; 
dotenv.config();

const app = express();
const server = http.createServer(app);
setupSocket(server);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());



app.use('/auth',authRouter)
app.use('/offline',offlinegame)
app.use('/rooms',room)

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
