import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export default async function connection() {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Database connected");
        return db;
    } catch (error) {
        console.error("❌ Database connection error:", error);
        throw error;
    }
}
