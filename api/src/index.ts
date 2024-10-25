// src/index.ts
import express from 'express';
import cron from 'node-cron';
import { syncAllData } from './sync/syncData';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

cron.schedule('0 0 * * *', () => {
  console.log('Running scheduled data synchronization');
  syncAllData();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

syncAllData();
