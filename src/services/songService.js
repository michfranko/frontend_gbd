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
 * @param {object} songData - Los datos de la canción a guardar.
 * @returns {Promise<object>} - Una promesa que resuelve a los datos de la respuesta.
 */
export const saveSong = async (songData) => {
  const response = await axios.post(`${API_URL}/add`, songData);
  return response.data;
};
