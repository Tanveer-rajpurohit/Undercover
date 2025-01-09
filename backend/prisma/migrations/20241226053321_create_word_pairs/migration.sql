-- CreateTable
CREATE TABLE "WordPair" (
    "id" SERIAL NOT NULL,
    "wordType" TEXT NOT NULL,
    "pair1" TEXT NOT NULL,
    "pair2" TEXT NOT NULL,

    CONSTRAINT "WordPair_pkey" PRIMARY KEY ("id")
);
