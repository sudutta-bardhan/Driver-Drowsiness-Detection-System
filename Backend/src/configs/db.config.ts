import mongoose from 'mongoose';
async function connectDB() {
    try {
        await mongoose.connect((process.env.MONGO_URL) as string)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}
export default connectDB;