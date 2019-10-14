import axios from 'axios';

export const fetchLatestArticles = async () => {
  try {
    const res = await axios.get('/api/news');
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const fetchNewsArticle = async (uid, slug) => {
  try {
    const res = await axios.get(`/api/news/${uid}/${slug}`);
    return res.data[0];
  } catch (error) {
    console.log('Error: ', error);
  }
};
