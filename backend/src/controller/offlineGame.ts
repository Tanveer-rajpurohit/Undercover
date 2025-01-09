import prisma from "../config/prismaClient";

const getWord = async (req: any, res: any) => {
  const { wordType } = req.body;

  try {
    // Determine if 'All' is selected and query accordingly
    const wordPairs = wordType === 'All'
      ? await prisma.wordPair.findMany() // If 'All', fetch all word pairs
      : await prisma.wordPair.findMany({
          where: {
            wordType: wordType, // Filter by selected word type
          },
        });

    if (wordPairs.length === 0) {
      return res.status(404).json({ message: "No word pairs found for the selected type" });
    }

    // Randomly select a word pair
    const randomWordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];

    // Return the selected word pair
    res.status(200).json(randomWordPair);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching word pairs" });
  }
};

export { getWord };
