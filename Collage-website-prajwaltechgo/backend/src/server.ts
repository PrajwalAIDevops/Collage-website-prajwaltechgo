import dotenv from 'dotenv';
import { createApp } from './app.js';
import { testDbConnection } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const app = createApp();

// Check MySQL connection on startup
testDbConnection().then((connected) => {
  if (connected) {
    console.log('✅ MySQL Database: CONNECTED');
  } else {
    console.warn('⚠️ MySQL Database: DISCONNECTED (Check your .env credentials or MySQL service status)');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 College Platform Backend API running on port ${PORT}`);
});
