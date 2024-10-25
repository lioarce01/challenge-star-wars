import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const fetchData = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

export { fetchData };
