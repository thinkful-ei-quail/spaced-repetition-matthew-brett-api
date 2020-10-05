CREATE TABLE "user" ( /* TODO Add an overall score value and add a words score object(?) for tracking users current score per word */
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "name" TEXT NOT NULL
);
