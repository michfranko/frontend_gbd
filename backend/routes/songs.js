const router = require('express').Router();
let Song = require('../models/song.model');

// Obtener todas las canciones o filtrar por nombre
router.route('/').get((req, res) => {
  // Obtener el parámetro de consulta 'name'
  const { name } = req.query;
  // Crear un objeto de consulta: si 'name' existe, buscar por nombre (insensible a mayúsculas/minúsculas)
  const query = name ? { name: { $regex: new RegExp(name, 'i') } } : {};

  // Buscar canciones en la base de datos según la consulta y popular el campo 'artist'
  Song.find(query)
    .populate('artist')
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Añadir una nueva canción
router.route('/add').post((req, res) => {
  const { name, genres, releaseDate, awards, downloads, artistId } = req.body;

  // Crear una nueva instancia de Canción con los datos del cuerpo de la solicitud
  const newSong = new Song({
    name,
    genres,
    releaseDate,
    awards,
    downloads,
    artist: artistId,
    // audioFileId se agregará más tarde
  });

  // Guardar la nueva canción en la base de datos
  newSong.save()
    .then(() => res.json('¡Canción agregada!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
