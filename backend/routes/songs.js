const router = require('express').Router();
let Song = require('../models/song.model');

router.route('/').get((req, res) => {
  Song.find()
    .populate('artist')
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { name, genres, releaseDate, awards, downloads, artistId } = req.body;

  const newSong = new Song({
    name,
    genres,
    releaseDate,
    awards,
    downloads,
    artist: artistId,
    // audioFileId will be added later
  });

  newSong.save()
    .then(() => res.json('Song added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
