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

import wordPairs from './wordPairs';
import prisma from './config/prismaClient';
const app = express();
const server = http.createServer(app);
setupSocket(server);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//add words pairs to db
// (async () => {
//   try {
//     const result = await prisma.wordPair.createMany({
//       data: wordPairs,
//       skipDuplicates: true,
//     });
//     console.log(`Seeded ${result.count} word pairs`);
//   } catch (error) {
//     console.error('Error seeding word pairs:', error);
//   }
// })();

app.use('/auth',authRouter)
app.use('/offline',offlinegame)
app.use('/rooms',room)

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
