
import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    });

    mongoose.connection.on('error', (err) => {
        console.error(`DB connection error: ${err.message}`);
    });

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/dreamspace`);
        console.log("Database connection established");
    } catch (err) {
        console.error("Failed to connect to the database", err);
    }
};

export default connectDB;
