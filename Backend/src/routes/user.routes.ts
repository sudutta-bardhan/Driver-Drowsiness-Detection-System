import express, { type Application, type Request, type Response } from 'express';
import Users from '../models/user.models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { saltRounds } from '../configs/consts.config';
import { checkUser, findUserByEmail, findUserByToken } from '../middlewares/users.middleware';
import { auth } from '../middlewares/auth.middleware';
// import { log } from 'node:console';

const router = express.Router();

dotenv.config();

// User Registration
router.post('/register', checkUser, async (req, res) => {
    let body = req.body;
    Users.insertOne({ ...body })
        .then(user => res.json({ message: "User registered successfully", user }))
        .catch(err => res.json({ message: "Error registering user", error: err.message }))
})

//Update User Details
router.put('/updateUser', auth, findUserByToken, async (req, res) => {
    try {
        const user = (req as any).user;
        const body = req.body;
        user.userName = body.userName ?? user.userName;
        user.contactNumber = body.contactNumber ?? user.contactNumber;
        await user.save();
        res.json({ message: "User details updated successfully", user })
    } catch (error: any) {
        res.json({ message: "Error updating user details", error: error.message })
    }
})

//Change Password
router.patch('/changePassword', auth, findUserByToken, async (req, res) => {
    try {
        const user3 = (req as any).user;
        const { oldPassword, newPassword } = req.body;
        const isMatch = await bcrypt.compare(oldPassword, user3.password);
        if (!isMatch) {
            res.status(401).json({ message: "Old password is incorrect" })
        } else {
            user3.password = bcrypt.hashSync(newPassword, saltRounds)
            await user3.save();
            res.json({ message: "Password changed successfully" })
        }
    } catch (error: any) {
        res.json({ message: "Error changing password", error: error.message })
    }
})

//Get All Users
router.get('/getAllUsers', auth, async (req, res) => {
    try {
        const allUsers = await Users.find();
        res.json({ message: "All Users retrieved successfully", allUsers })
    } catch (error: any) {
        res.json({ message: "Error retrieving all users", error: error.message })
    }
})

//Get Individual User
router.get('/getUser', auth, findUserByToken, async (req, res) => {
    try {
        const user = (req as any).user;
        res.json({ message: "User details retrieved successfully", user })
    } catch (error: any) {
        res.json({ message: "Error retrieving user details", error: error.message })
    }
})

//Search User by Name
router.get("/findUsers", auth, async (req, res) => {
    const { findUser } = req.query;
    console.log("Query received:", typeof findUser);


    const foundUsers = await Users.find({
        userName: { $regex: String(findUser), $options: "i" },
    });
    res.json({ message: "User details fetched successfully", users: foundUsers });

});

//Forgot Password
router.patch('/forgotPassword', findUserByEmail, async (req, res) => {
    try {
        const user4 = (req as any).user;
        const { dateOfBirth, newPassword } = req.body;
        if (dateOfBirth !== user4.dateOfBirth) {
            res.status(401).json({ message: "Date of birth is incorrect! Cannot Verify User" })
        } else {
            user4.password = bcrypt.hashSync(newPassword, saltRounds)
            await user4.save();
            res.json({ message: "Password changed successfully" })
        }
    } catch (error: any) {
        res.json({ message: "Error changing password", error: error.message })
    }
})

export default router;