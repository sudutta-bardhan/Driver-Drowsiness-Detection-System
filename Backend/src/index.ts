// This is a Typescript file; all syntactical rules for Typescript will be applied.

import express, { type Application, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/db.config';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import cors from 'cors';




dotenv.config();
connectDB();


const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());

app.use('/', userRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);

