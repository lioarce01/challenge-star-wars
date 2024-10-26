import importData from './syncData';

const sync = async () => {
  console.log('Syncing data...');
  await importData();
  console.log('Data synced successfully');
};

export default sync;
