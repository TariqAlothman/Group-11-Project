const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@cooksmart.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Chef User',
    email: 'chef@cooksmart.com',
    password: 'chef123',
    role: 'chef',
  },
];

async function seed() {
  try {
    for (const userData of seedUsers) {
      const exists = await User.findOne({ email: userData.email });
      if (exists) {
        console.log(`⏭  ${userData.role} already exists (${userData.email})`);
      } else {
        await User.create(userData);
        console.log(`✅ Created ${userData.role}: ${userData.email}`);
      }
    }

    console.log('\nDone! You can now log in with:');
    console.log('  Admin  →  admin@cooksmart.com  /  admin123');
    console.log('  Chef   →  chef@cooksmart.com   /  chef123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
