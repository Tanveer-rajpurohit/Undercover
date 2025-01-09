import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { PrismaClient, User } from "@prisma/client";
 
dotenv.config();

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (error: any, user?: User | false) => void
    ) => {
      try {
        // Check if the user exists using the Google ID
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {

          const email = profile.emails && profile.emails[0].value;
          const extractedName = email ? email.split("@")[0] : "No Name";

          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails ? profile.emails[0].value : '',
              name: profile.displayName || extractedName,
              profilePicture: profile.photos ? profile.photos[0].value : '',
            },
          });
        }

        done(null, user); // Pass user to the done callback
      } catch (error) {
        console.error(error);
        done(error); // Return error if something goes wrong
      }
    }
  )
);
