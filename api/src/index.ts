import express from 'express';
import cron from 'node-cron';
import sync from './services/syncService';
import { PrismaClient } from '@prisma/client';
import router from './routes';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

cron.schedule('0 0 * * *', () => {
  sync();
});

app.use('/', router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// sync()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (error) => {
//     console.error(error);
//     await prisma.$disconnect();
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
