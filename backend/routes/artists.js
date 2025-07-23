const router = require('express').Router();
let Artist = require('../models/artist.model');

router.route('/').get((req, res) => {
  Artist.find()
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { name, country, birthDate, genre } = req.body;

  const newArtist = new Artist({
    name,
    country,
    birthDate: Date.parse(birthDate),
    genre,
  });

  newArtist.save()
    .then(() => res.json('Artist added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
