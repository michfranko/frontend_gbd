const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://clave123:clave123@cluster1.a33jus8.mongodb.net/Music-App?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const artistsRouter = require('./routes/artists');
const songsRouter = require('./routes/songs');

app.use('/artists', artistsRouter);
app.use('/songs', songsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
