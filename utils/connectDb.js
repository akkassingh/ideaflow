import mongoose from 'mongoose';
const db = process.env.MONGODB_PATH;

const connectDB = async () => {
    try {
        if (!db) {
            throw new Error('MONGODB_PATH is not defined');
        }
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB Connected');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

export default connectDB;
