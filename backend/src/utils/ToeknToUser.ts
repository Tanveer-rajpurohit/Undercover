import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the type for the token object
interface Token {
  token: string;
}

export const tokenToUser = (token: Token) => {
  try {
    const decoded = jwt.verify(token.token, "abcdef") as JwtPayload;
    return decoded.userId; 
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
