import axios from 'axios';

// URL base para las peticiones a la API de artistas
const API_URL = '/artists';

/**
 * Obtiene los artistas desde la API.
 * @param {string} searchTerm - Término de búsqueda para filtrar artistas por nombre.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de artistas.
 */
export const getArtists = async (searchTerm = '') => {
  const response = await axios.get(API_URL, {
    params: { name: searchTerm },
  });
  return response.data;
};

/**
 * Guarda un nuevo artista en la base de datos.
 * @param {object} artist - El objeto del artista a guardar.
 * @returns {Promise<object>} - Una promesa que resuelve a los datos de la respuesta.
 */
export const saveArtist = async (artist) => {
  const response = await axios.post(`${API_URL}/add`, artist);
  return response.data;
};
