import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the correct model
import UserPortfolio from '../models/portfoliomodel.js';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

async function insertPortfolioUser(username, password, fullName, title, email) {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserPortfolio({
      username: username.toLowerCase(),
      password: hashedPassword,
      fullName,
      title,
      contact: {
        email,
      }
    });

    const savedUser = await newUser.save();
    console.log('Portfolio user inserted:', {
      id: savedUser._id,
      username: savedUser.username,
      fullName: savedUser.fullName,
      email: savedUser.contact.email
    });

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting portfolio user:', error.message);
    process.exit(1);
  }
}

// Example usage
const args = process.argv.slice(2);
if (args.length !== 5) {
  console.log('Usage: node insert-portfolio-user.js <username> <password> <fullName> <title> <email>');
  process.exit(1);
}

const [username, password, fullName, title, email] = args;
insertPortfolioUser(username, password, fullName, title, email);
