import { Router, Request, Response } from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authRouter = Router();

// Google authentication route
authRouter.get('/google', passport.authenticate('google', {
  scope: ['email'],
}));

authRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login', session: false }),
  (req: Request, res: Response) => {
    if (req.user) {
      const user = req.user as any;
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '30d' }
      );

      res.redirect(`http://localhost:5173/login?token=${token}`);
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  });



export default authRouter;
