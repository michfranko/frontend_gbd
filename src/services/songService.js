import axios from 'axios';

const API_URL = '/songs';

export const getSongs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const saveSong = async (songData) => {
  const response = await axios.post(`${API_URL}/add`, songData);
  return response.data;
};
