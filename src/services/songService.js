import axios from 'axios';

// URL base para las peticiones a la API de canciones
const API_URL = '/songs';

/**
 * Obtiene las canciones desde la API.
 * @param {string} searchTerm - Término de búsqueda para filtrar canciones por nombre.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de canciones.
 */
export const getSongs = async (searchTerm = '') => {
  const response = await axios.get(API_URL, {
    params: { name: searchTerm },
  });
  return response.data;
};

/**
 * Guarda una nueva canción en la base de datos.
 * @param {FormData} songData - Los datos de la canción a guardar, incluyendo el archivo de audio.
 * @returns {Promise<object>} - Una promesa que resuelve a los datos de la respuesta.
 */
export const saveSong = async (songData) => {
  const response = await axios.post(`${API_URL}/add`, songData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getMostDownloadedSongs = async () => {
  const response = await axios.get(`${API_URL}/reports/most-downloaded`);
  return response.data;
};

export const getSongsByReleaseDate = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/reports/by-release-date`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const getSongsByArtist = async (artistId) => {
  const response = await axios.get(`${API_URL}/reports/by-artist/${artistId}`);
  return response.data;
};

export const getSongsByGenre = async (genre) => {
  const response = await axios.get(`${API_URL}/reports/by-genre/${genre}`);
  return response.data;
};

export const getCollaboratorsByArtist = async (artistId) => {
  const response = await axios.get(`${API_URL}/reports/collaborators-by-artist/${artistId}`);
  return response.data;
};
