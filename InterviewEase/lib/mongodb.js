import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

let isConnected = false;

export async function connectDb() {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return mongoose.connection; // Return the existing connection
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connected to MongoDB');
    return mongoose.connection; // Return the new connection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Could not connect to MongoDB');
  }
}