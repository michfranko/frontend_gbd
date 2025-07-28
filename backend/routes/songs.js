const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
let Song = require('../models/song.model');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: 'dpxcsnaky',
  api_key: '496845855725494',
  api_secret: 'lQI0WMaIHLCFvyM18T7YVcs9MJU'
});

// Configurar Multer para usar Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'songs',
    format: async (req, file) => 'mp3',
    public_id: (req, file) => file.originalname,
    resource_type: 'video', // Cloudinary trata el audio como video
  },
});

const upload = multer({ storage: storage });

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
router.route('/add').post(upload.single('audioFile'), async (req, res) => {
  try {
    const { name, genres, releaseDate, awards, downloads, artistId } = req.body;
    const audioFileUrl = req.file.path; // URL del archivo en Cloudinary

    // Crear una nueva instancia de Canción con los datos del cuerpo de la solicitud
    const newSong = new Song({
      name,
      genres,
      releaseDate,
      awards,
      downloads,
      artist: artistId,
      audioFileUrl,
    });

    // Guardar la nueva canción en la base de datos
    await newSong.save();
    res.json('¡Canción agregada!');
  } catch (err) {
    console.error('Error adding song:', err.stack);
    res.status(500).json('Error: ' + err.message);
  }
});

module.exports = router;
