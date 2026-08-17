import app from './app.js';
import prisma from './config/prisma.js';
import { redisClient } from './config/redis.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');
    await redisClient.ping();
    console.log('✅ Redis connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (${process.env.ENVIRONMENT})`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  await redisClient.disconnect();
  process.exit(0);
});

startServer();