import { Server } from 'socket.io';
import { tokenToUser } from '../utils/ToeknToUser';
import prisma from './prismaClient';

// Define types for players
interface Player {
  userId: number;
  status: string;
  role: string;
  micStatus: string;
  name: string;
}

interface Role{
  userId: number;
  micStatus: string;
  name: string;
  role:string;
  word: string;
  eliminated: boolean;
  voteCompleted: boolean;
  vote:number
}

// Type for the result of checkUserInRoom
interface CheckUserInRoomResult {
  game: any | null;  // You can define a more specific type here if needed
  isUserInRoom: boolean;
}


const checkUserInRoom = async (userId: number): Promise<CheckUserInRoomResult> => {
  // Fetch the game with status 'waiting' or 'ongoing'
  const game = await prisma.game.findFirst({
    where: {
      status: {
        in: ['waiting', 'ongoing'],
      },
    },
    select:{
      id: true,
      roomCode: true,
      status: true,
      WordType: true,
      hostId: true,
      players: true,
      roles: true,
      User:{
        select:{
        profilePicture: true        
        },
      },
      ChatMessage: {
        select: {
          id: true,
          message: true,
          userId: true,
          gameId:true,
          createdAt: true,
          User: {
            select:{
              id: true,
              name: true,
              email: true,
              profilePicture: true
            }
          }
        },
        
      },
      createdAt: true,
    }
  });

  // If a game is found, check if the user is part of the room
  if (game) {
    const players: Player[] = JSON.parse(game.players as string); // Parse the JSON string to an object
    const isUserInRoom = players.some((player: Player) => player.userId === userId);
    
    return { game, isUserInRoom };
  } else {
    return { game: null, isUserInRoom: false };
  }
};

export const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: '*' }
  });



  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('check-game-status', async (token) => {
      const user = tokenToUser(token);
     

      if (user) {
        const { game, isUserInRoom } = await checkUserInRoom(user);

        if (isUserInRoom) {
          if (game && game.status === 'waiting') {
            
            socket.join(game.roomCode);
            socket.emit('user-in-waiting-room', game);
          } else if (game && game.status === 'ongoing') {

            socket.join(game.roomCode);
            socket.emit('user-in-ongoing-game', game);
          }
        } else {
          // Handle case where user is not in any room
          socket.emit('user-not-in-room');
        }
      } else {
        socket.emit('invalidToken');
      }
    });

    socket.on('get-game-data', async (token) => {
      const user = tokenToUser(token);
      if (user) {
        const { game, isUserInRoom } = await checkUserInRoom(user); // Ensure you're passing the correct userId
        
        if (isUserInRoom) {
          if (game && game.status === 'waiting') {
            socket.join(game.roomCode);
            socket.emit('user-in-waiting-room', {game,user});
          } else if(game && game.status === 'ongoing'){
            socket.join(game.roomCode);
            socket.emit('user-in-ongoing-room', {game,user});
          }
          else {
            socket.join(game.roomCode);
            socket.emit('user-not-in-room');
          }
        } else {
          socket.emit('user-not-in-room');
        }
      } else {
        socket.emit('invalidToken');
      }
    });

    socket.on('joinRoom', async (data) => {
      const { roomCode, token} = data;
    
      const userId = await tokenToUser({token});
     
      
      try {

        const user = await prisma.user.findUnique({
          where: { id: userId },
        })

        const gameRoom = await prisma.game.findUnique({
          where: { roomCode },
          select:{
            id: true,
            roomCode: true,
            status: true,
            WordType: true,
            hostId: true,
            players: true,
            roles: true,
            User:{
              select:{
              profilePicture: true        
              },
            },
            ChatMessage: {
              select: {
                id: true,
                message: true,
                userId: true,
                gameId:true,
                createdAt: true,
                User: {
                  select:{
                    id: true,
                    name: true,
                    email: true,
              profilePicture: true,

                  }
                }
              },
              
            },
            createdAt: true,
          }
        });
    
        if (!gameRoom) {
          socket.emit('joinRoomError', { message: 'Game room not found' });
          return;
        }
    
        let players = JSON.parse(gameRoom.players as string);
    
        // Check if the player is already in the game room
        const playerIndex = players.findIndex((player: any) => player.userId === userId);
        const isPlayerAlreadyInRoom = players.some((player: any) => player.userId === userId);
        if (isPlayerAlreadyInRoom) {
          socket.emit('joinRoomSuccess', { message: 'Player successfully joined the game room' });
        }
    
        if (playerIndex !== -1) {
          socket.emit('joinRoomError', { message: 'Player already in the game room' });
          
          return;
        }
    
        // Add the current user to the players array
        const currentUser = { 
          userId, 
          status: 'active', 
          role: 'player', 
          micStatus: 'off',
          name: user?.name,
        };
        players.push(currentUser);
    
        // Update the game room in the database with the new players list
       const roomData =  await prisma.game.update({
          where: { roomCode },
          data: {
            players: JSON.stringify(players),
          },
          select:{
            id: true,
            roomCode: true,
            status: true,
            WordType: true,
            hostId: true,
            players: true,
            roles: true,
            ChatMessage: {
              select: {
                id: true,
                message: true,
                userId: true,
                gameId:true,
                createdAt: true,
                User: {
                  select:{
                    id: true,
                    name: true,
                    email: true,
                  }
                }
              },
              
            },
            createdAt: true,
          }
        });
    
        // Join the socket to the room
        socket.join(roomCode);
        console.log(`User ${userId} joined room: ${roomCode}`);
    
        // Emit to all clients in the room that a player has joined
        io.to(roomCode).emit('playerJoined', { roomData });
    
        // Send a success message to the current user
        socket.emit('joinRoomSuccess', { message: 'Player successfully joined the game room' });
        
      } catch (error) {
        console.error(error);
        socket.emit('joinRoomError', { message: 'An error occurred while joining the room' });
      }
    });

    socket.on("sendMessage", async (data) => {
      const { gameId, userId, message,roomCode } = data;
      
      
      const savedMessage = await prisma.chatMessage.create({
        data: {
          gameId,
          userId,
          message,
        },
        include: {
          User: {
            select:{
              name: true,
              email: true,
              profilePicture: true,
            }
          } 
        },
      });
  
    
      io.to(roomCode).emit("newMessage", {savedMessage});
    });

    
    socket.on('leaveRoom', async (data) => {
      const { roomCode, token } = data;
    
      const userId = await tokenToUser({ token });
      console.log(`User ${userId} is leaving room: ${roomCode}`);
    
      try {
        const gameRoom = await prisma.game.findUnique({
          where: { roomCode },
          select:{
            id: true,
            roomCode: true,
            status: true,
            WordType: true,
            hostId: true,
            players: true,
            roles: true,
            User:{
              select:{
              profilePicture: true        
              },
            },
            ChatMessage: {
              select: {
                id: true,
                message: true,
                userId: true,
                gameId:true,
                createdAt: true,
                User: {
                  select:{
                    name: true,
                    email: true,
              profilePicture: true,

                  }
                }
              },
              
            },
            createdAt: true,
          }
        });
    
        if (!gameRoom) {
          socket.emit('leaveRoomError', { message: 'Game room not found' });
          return;
        }
    
        let players = JSON.parse(gameRoom.players as string);
    
        // Find the player to remove from the room
        const playerIndex = players.findIndex((player: any) => player.userId === userId);
        if (playerIndex === -1) {
          socket.emit('leaveRoomError', { message: 'Player not found in the game room' });
          return;
        }
    
        // Handle if the host is leaving
        if (gameRoom.hostId === userId) {
          await prisma.game.update({
            where: { roomCode },
            data: {
              status: 'completed',  // or 'inactive', depending on your flow
              players: JSON.stringify([]),  // Clearing the player list
            },
          });
          socket.emit('leaveRoomSuccess', { message: 'Host left, game completed. Player list cleared.' });
    
          // Optionally, you can broadcast this event to all clients
          io.to(roomCode).emit('gameCompleted', { message: 'Host has left. Game is completed.' });
        } else {
          // Remove the player from the room
          players.splice(playerIndex, 1);
    
          await prisma.game.update({
            where: { roomCode },
            data: {
              players: JSON.stringify(players),
            },
          });
    
          socket.emit('leaveRoomSuccess', { message: 'Player successfully left the game room' });
    
          // Optionally, you can broadcast this event to all clients
          io.to(roomCode).emit('playerLeft', { userId, players });
        }
    
        // Leave the socket from the room
        socket.leave(roomCode);
        console.log(`User ${userId} left room: ${roomCode}`);
    
      } catch (error) {
        console.error(error);
        socket.emit('leaveRoomError', { message: 'An error occurred while leaving the room' });
      }
    });

    socket.on('startGame', async (data) => {
      const { roomCode, civilians, undercovers, mrWhite } = data;
    
      try {
        // Fetch game details
        const game = await prisma.game.findUnique({
          where: { roomCode },
          select:{
            id: true,
            roomCode: true,
            status: true,
            WordType: true,
            hostId: true,
            players: true,
            roles: true,
            User:{
              select:{
              profilePicture: true        
              },
            },
            ChatMessage: {
              select: {
                id: true,
                message: true,
                userId: true,
                gameId:true,
                createdAt: true,
                User: {
                  select:{
                    id: true,
                    name: true,
                    email: true,
              profilePicture: true,

                  }
                }
              },
              
            },
            createdAt: true,
          }
        });
    
        if (!game) {
          socket.emit("startGameError", { message: "Game not found for the provided room code." });
          return;
        }
    
        let players: Player[];
        try {
          players = JSON.parse(game.players as string || "[]");
        } catch (error) {
          socket.emit("startGameError", { message: "Failed to parse players list." });
          return;
        }
    
        if (game.status === 'completed') {
          socket.emit('startGameError', { message: 'Game has already completed.' });
          return;
        }
    
        const numberOfPlayers = players.length;
        if (numberOfPlayers !== civilians + undercovers + mrWhite) {
          socket.emit("startGameError", { message: "Total joined players and total number of roles are not equal." });
          return;
        }
    
        // Assign random roles
        const randomRoles = [
          ...Array(civilians).fill("Civilian"),
          ...Array(undercovers).fill("Undercover"),
          ...Array(mrWhite).fill("Mr White"),
        ];
    
        for (let i = randomRoles.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomRoles[i], randomRoles[j]] = [randomRoles[j], randomRoles[i]]; // Swap elements
        }
    
        // Fetch a random word pair based on WordType
        const wordPairs = game.WordType === 'All'
      ? await prisma.wordPair.findMany() // If 'All', fetch all word pairs
      : await prisma.wordPair.findMany({
          where: {
            wordType: game.WordType, // Filter by selected word type
          },
        });
    
        if (!wordPairs || wordPairs.length === 0) {
          socket.emit("startGameError", { message: "No word pairs found for the selected word type." });
          return;
        }
    
        const randomWordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];

    
        const roles: Role[] = [];
        for (let i = 1; i <= numberOfPlayers; i++) {
          const role = randomRoles[i - 1];
          console.log(role);
          
          let assignedWord = "";
          
          if (role == "Civilian") {
            assignedWord = randomWordPair.pair1; 
          } else if (role === "Undercover") {
            assignedWord = randomWordPair.pair2; 
          } else if (role === "Mr White") {
            assignedWord = "You are Mr. White, you have no word."; 
          }
    
          roles.push({
            name: players[i-1].name,
            userId: players[i-1].userId,
            micStatus: players[i-1].micStatus,
            role: role,
            eliminated: false,
            word: assignedWord,
            voteCompleted: false,
            vote: 0,
          });
        }
    
        // Update game data
        await prisma.game.update({
          where: { roomCode },
          data: {
            roles: JSON.stringify(roles),
            status: 'ongoing',
          },
        });
    
        io.to(roomCode).emit('startGameSuccess', { game: { ...game, roles } });
      } catch (error) {
        console.error(error);
        socket.emit("startGameError", { message: "An error occurred while starting the game." });
      }
    });
    

    socket.on('VoteIncrease', async (data) => {
      const { roomCode, To, currentUserId } = data;
    
      const game = await prisma.game.findUnique({
        where: { roomCode },
        select: {
          roles: true,
          status: true
        },
      });
    
      if (!game) {
        socket.emit("VoteIncreaseError", { message: "Game not found for the provided room code." });
        return;
      }
    
      const roles:Role[] = JSON.parse(game.roles as string);
    
      const targetPlayer = roles.find((role) => role.userId === To);
      const currentPlayer = roles.find((role) => role.userId === currentUserId);
    
      if (!targetPlayer || !currentPlayer) {
        socket.emit("VoteIncreaseError", { message: "Player not found." });
        return;
      }
    
      if (targetPlayer.eliminated) {
        socket.emit("VoteIncreaseError", { message: "Player has already been eliminated." });
        return;
      }
    
      if (!currentPlayer.voteCompleted) {
        currentPlayer.voteCompleted = true;
        targetPlayer.vote += 1;
      }
    
      await prisma.game.update({
        where: { roomCode },
        data: { roles: JSON.stringify(roles) },
      });
    
      const allVoted = roles.every((p) => p.voteCompleted);
    
      if (allVoted) {
        // Eliminate the player with the most votes
        const mostVotedPlayer = roles.reduce((max, player) =>
          player.vote > max.vote ? player : max
        );
    
        mostVotedPlayer.eliminated = true;
   
    
        await prisma.game.update({
          where: { roomCode },
          data: { roles: JSON.stringify(roles) },
        });

       
       
        const remainingCivilians = roles.filter((p) => p.role === "Civilian" && !p.eliminated).length;
        const remainingUndercovers = roles.filter((p) => p.role === "Undercover" && !p.eliminated).length;
        const remainingMrWhites = roles.filter((p) => p.role === "Mr White" && !p.eliminated).length;
    
        let winCondition = null;
    
        if (remainingUndercovers === 0 && remainingMrWhites === 0) {
          winCondition = "CivilianWin";
        } else if (remainingUndercovers <= remainingCivilians && remainingMrWhites === 0) {
          if (remainingCivilians === remainingUndercovers) {
            winCondition = "UndercoverWin";
          }
        } else if (remainingMrWhites <= remainingCivilians && remainingUndercovers === 0) {
          if (remainingCivilians === remainingMrWhites) {
            winCondition = "MrWhiteWin";
          }
        } else if (
          remainingCivilians === 0 &&
          remainingUndercovers > 0 &&
          remainingMrWhites > 0
        ) {
          winCondition = "UndercoverWin";
        }
    
        if (winCondition) {

          roles.forEach((role) => {
            role.vote = 0;
            role.voteCompleted = false;
            role.word = "";
            role.eliminated = false;
            role.role = ""; 
          });

         game.status = "waiting"

          
    
          await prisma.game.update({
            where: { roomCode },
            data: { roles: JSON.stringify(roles) , status: "waiting"},
          });
         
          
          io.to(roomCode).emit("GameOver", { winCondition });
        } else {
          roles.forEach((role) => {
            role.vote = 0;
            role.voteCompleted = false;
          });
  
      
          await prisma.game.update({
            where: { roomCode },
            data: { roles: JSON.stringify(roles) },
          });
  
          io.to(roomCode).emit("PlayerEliminated", { roles });
        }
      } else {
        io.to(roomCode).emit("VoteUpdated", { roles });
      }
    });
    

    

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    
    });
  });

  return io;
};
