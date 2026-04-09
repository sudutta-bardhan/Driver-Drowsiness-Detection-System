import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName:{ type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    dateOfBirth:{ type: String, required: true },
    contactNumber:{ type: String, required: true },
    // role:{ type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true, versionKey: false })
const Users = mongoose.model("user", userSchema);
export default Users;