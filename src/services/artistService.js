import axios from 'axios';

const API_URL = '/artists';

export const getArtists = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const saveArtist = async (artist) => {
  const response = await axios.post(`${API_URL}/add`, artist);
  return response.data;
};
