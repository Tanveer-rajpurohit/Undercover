import prisma from '../config/prismaClient';
import crypto from 'crypto';


const generateRoomCode = () => {
  return crypto.randomBytes(4).toString('hex');  // Generate 8-character hexadecimal string
};


const createRoom = async (req: any, res: any) => {
  const { WordType, mode } = req.body;
  const { userId } = req.user;

  const hostId = userId;

  try {
    // Get all games
    const ongoingGames = await prisma.game.findMany();

    // Check if the user is already part of any game
    const existingGame = ongoingGames.find(game => {
      if (game.players) {
        const players = JSON.parse(game.players as string); // Ensure players is a string
        return players.some((player: { userId: number }) => player.userId === hostId); // Check if userId exists in players
      }
      return false;
    });

    if (existingGame) {
      return res.status(400).json({
        message: 'You are already part of an ongoing game.',
        game: existingGame,
      });
    }

    const roomCode = generateRoomCode();

    // Ensure room code uniqueness
    const existingRoom = await prisma.game.findUnique({
      where: { roomCode },
    });

    if (existingRoom) {
      return res.status(400).json({ message: 'Room code already exists' });
    }

    // Add the host to the players list (with mic status, role, etc.)
    const host = await prisma.user.findUnique({
      where: { id: hostId },
    });

    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }

    // Create the new game room
    const gameRoom = await prisma.game.create({
      data: {
        roomCode,
        status: 'waiting', // Default status to 'waiting'
        WordType,
        hostId,
        mode,
        players: JSON.stringify([
          {
            userId: host.id,
            status: 'online',
            role: 'host',
            micStatus: 'off',
            name: host.name,
          },
        ]),
      },
    });

    // Return the created game room data
    res.status(201).json(gameRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the game room' });
  }
};



const addPlayer = async (req:any, res: any) => {
  const { roomCode } = req.body;
  const { userId } = req.user; // Assuming req.user contains the user ID from an authenticated user
  
  try {
    // Find the user by userId
    const user = await prisma.user.findUnique({
      where: { id: userId.userId }, 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the game room by roomCode
    const gameRoom = await prisma.game.findUnique({
      where: { roomCode },
    });

    if (!gameRoom) {
      return res.status(404).json({ message: 'Game room not found' });
    }

    // Check if the user is already in the game
    const players = JSON.parse(gameRoom.players as string);
    const isPlayerAlreadyInRoom = players.some((player: any) => player.userId === user.id);

    if (isPlayerAlreadyInRoom) {
      return res.status(400).json({ message: 'Player is already in the game room' });
    }

    // Add the new player to the game room's players list
    players.push({
      userId: user.id,
      status: 'online',
      role: '',   // Role is not assigned initially
      micStatus: 'off',  // Default mic status
      name: user.name,
    });

    // Update the game room with the new players list
    await prisma.game.update({
      where: { roomCode },
      data: {
        players: JSON.stringify(players), // Store updated players list as JSON
      },
    });

    // Return the updated game room data
    res.status(200).json({ message: 'Player added to the game room', gameRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding player to the game room' });
  }
};


const removePlayer = async (req: any, res: any) => {
  const { roomCode, userId } = req.body;

  try {
    
    const gameRoom = await prisma.game.findUnique({
      where: { roomCode },
    });

    if (!gameRoom) {
      return res.status(404).json({ message: 'Game room not found' });
    }

    let players = JSON.parse(gameRoom.players as string);

   
    const playerIndex = players.findIndex((player: any) => player.userId === userId);

    if (playerIndex === -1) {
      return res.status(404).json({ message: 'Player not found in the game room' });
    }

    
    if (gameRoom.hostId === userId) {
      
      await prisma.game.update({
        where: { roomCode },
        data: {
          status: 'completed',
          players: JSON.stringify([]), 
        },
      });

      return res.status(200).json({ message: 'Host left, game completed. Player list cleared.' });
    }

    
    players.splice(playerIndex, 1);

    
    await prisma.game.update({
      where: { roomCode },
      data: {
        players: JSON.stringify(players),
      },
    });

    res.status(200).json({ message: 'Player removed from the game room' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while removing the player' });
  }
};

const showRoom = async (req:any, res: any) => {
  const {userId} = req.user;

  try {
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const gameList = await prisma.game.findMany({
    where: {status :"waiting"},
    select: {
      id: true,
      roomCode: true,
      status: true,
      WordType: true,
      hostId: true,
      players: true,
      roles: true,
      ChatMessage: true,
      createdAt: true,
    }
  })

  res.status(200).json(gameList);

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching game room data' });
  }

}

export { createRoom, addPlayer,removePlayer ,showRoom};
