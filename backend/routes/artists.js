const router = require('express').Router();
let Artist = require('../models/artist.model');

// Obtener todos los artistas o filtrar por nombre
router.route('/').get((req, res) => {
  // Obtener el parámetro de consulta 'name'
  const { name } = req.query;
  // Crear un objeto de consulta: si 'name' existe, buscar por nombre (insensible a mayúsculas/minúsculas)
  const query = name ? { name: { $regex: new RegExp(name, 'i') } } : {};

  // Buscar artistas en la base de datos según la consulta
  Artist.find(query)
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Añadir un nuevo artista
router.route('/add').post((req, res) => {
  const { name, country, birthDate, genre } = req.body;

  // Crear una nueva instancia de Artista con los datos del cuerpo de la solicitud
  const newArtist = new Artist({
    name,
    country,
    birthDate: Date.parse(birthDate),
    genre,
  });

  // Guardar el nuevo artista en la base de datos
  newArtist.save()
    .then(() => res.json('¡Artista agregado!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
