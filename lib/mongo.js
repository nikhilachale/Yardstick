// mongo.js
import mongoose from 'mongoose';

export async function connectDB() {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB is already connected.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
