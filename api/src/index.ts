import express from 'express';
import cron from 'node-cron';
import sync from './services/sync/syncService';
import router from './routes';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET',
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'test') {
  cron.schedule('0 0 * * *', () => {
    sync();
  });
}

app.use('/', router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// sync()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (error) => {
//     console.error(error);
//     await prisma.$disconnect();
//   });

export default app;
