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
    .populate('collaborators')
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Añadir una nueva canción
router.route('/add').post(upload.single('audioFile'), async (req, res) => {
  try {
    const { name, genres, releaseDate, awards, downloads, artistId, collaborators } = req.body;
    const audioFileUrl = req.file.path; // URL del archivo en Cloudinary

    // Crear una nueva instancia de Canción con los datos del cuerpo de la solicitud
    const newSong = new Song({
      name,
      genres,
      releaseDate,
      awards,
      downloads,
      artist: artistId,
      collaborators: collaborators || [],
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

// Reporte: Canciones con mayor descarga
router.route('/reports/most-downloaded').get((req, res) => {
  Song.find()
    .sort({ downloads: -1 })
    .limit(10)
    .populate('artist')
    .populate('collaborators')
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Reporte: Canciones estrenadas en un período de tiempo
router.route('/reports/by-release-date').get((req, res) => {
  const { startDate, endDate } = req.query;
  Song.find({
    releaseDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  })
    .populate('artist')
    .populate('collaborators')
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Reporte: Canciones por artista
router.route('/reports/by-artist/:artistId').get((req, res) => {
  const { artistId } = req.params;
  Song.find({ artist: artistId })
    .populate('artist')
    .populate('collaborators')
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Reporte: Canciones por género
router.route('/reports/by-genre/:genre').get((req, res) => {
  const { genre } = req.params;
  Song.find({ genres: genre })
    .populate('artist')
    .populate('collaborators')
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Reporte: Lista de colaboradores por cantante
router.route('/reports/collaborators-by-artist/:artistId').get(async (req, res) => {
  try {
    const { artistId } = req.params;
    const songs = await Song.find({ artist: artistId }).populate('collaborators');
    const collaborations = [];
    songs.forEach(song => {
      song.collaborators.forEach(collaborator => {
        collaborations.push({
          collaborator,
          song: {
            name: song.name,
            releaseDate: song.releaseDate,
          },
        });
      });
    });
    res.json(collaborations);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
