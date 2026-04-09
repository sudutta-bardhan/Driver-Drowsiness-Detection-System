import express, { NextFunction, type Request, type Response } from 'express';
import Users from '../models/user.models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { saltRounds } from '../configs/consts.config';

dotenv.config();

async function checkUser(req:Request, res: Response, next: NextFunction) {
    try {
        for (const key of ['userName', 'email', 'password', 'dateOfBirth', 'contactNumber']) {
            if (!req.body[key]) {
                return res.status(400).json({ message: `Missing ${key} in request body` });
            }
        }
        const existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
        }
        next()
    } catch (err: any) {
        res.json({ message: "Error checking user", error: err.message });
    }  
}

async function findUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await Users.findOne({ email: req.body.email }).exec();
        if (!user) {
            return res.status(404).json({ message: `User with email ${req.body.email} not found` });
        }
        (req as any).user = user;
        next();
    } catch (err: any) {
        res.json({ message: "Error finding user", error: err.message });
    }
}

async function findUserByToken(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await Users.findById((req as any).bearerToken.userId).exec();
        if (!user) {
            return res.status(404).json({ message: `User not found` });
        }
        (req as any).user = user;
        next();
    } catch (err: any) {
        res.json({ message: "Error finding user", error: err.message });
    }
}



export { checkUser, findUserByEmail, findUserByToken };