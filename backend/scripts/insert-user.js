import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/usermodel.js';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

async function insertUser(name, email, username, password) {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    console.log('User inserted:', {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      username: savedUser.username
    });

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting user:', error.message);
  }
}

// Example usage - modify these values
const args = process.argv.slice(2);
if (args.length !== 4) {
  console.log('Usage: node insert-user.js <name> <email> <username> <password>');
  process.exit(1);
}

insertUser(args[0], args[1], args[2], args[3]);

