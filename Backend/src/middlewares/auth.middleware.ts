import express, { NextFunction, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            let bearerToken: any = bearerHeader.split(' ');      //split kore newar por array banay
            bearerToken = bearerToken[1];                   //0 te 'Bearer' ar 1 e token thakbe
            const user1 = jwt.verify(bearerToken, (process.env.JWT_SECRET) as string);
            (req as any).bearerToken = user1;
            next();
        }
        else {
            return res.status(403).json({ message: "Authorization token missing" });
        }
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}


export { auth };