import axios from 'axios';

export const fetchQuestions = async () => {
  try {
    const res = await axios.get('/api/questions');
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
};
