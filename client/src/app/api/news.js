import axios from 'axios';

export const fetchLatestArticles = async () => {
  try {
    const res = await axios.get('/api/news');
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
};
