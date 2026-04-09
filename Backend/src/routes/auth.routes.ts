import express, { type Application, type Request, type Response } from 'express';
import Projects from '../models/project.models';
import Users from '../models/user.models';
import Tasks from '../models/task.models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../middlewares/users.middleware';

const router = express.Router();

dotenv.config();

//User Login
router.post('/login', findUserByEmail, async (req, res) => {
    try {
        const password = req.body.password
        const user = (req as any).user
        await bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error comparing passwords", error: err.message });
            }
            if (!result) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign(
                { userId: user._id, username: user.userName, email: user.email, role: user.role },
                (process.env.JWT_SECRET) as string,
                { expiresIn: '1h' }
            )
            res.json({ message: "Login successful", token });
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})



export default router;