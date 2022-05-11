import dotenv from 'dotenv';

dotenv.config();

export const DATABASE_URI = process.env.DATABASE_URI;
export const JWT_SECRET = process.env.JWT_SECRET;