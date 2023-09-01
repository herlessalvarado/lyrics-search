import express, { Request, Response } from 'express';
import MusicModel from './models/music';
import { connect } from 'mongoose';

connect("mongodb+srv://software-2:EDNiZtTVZ4PUWQJ2@cluster0.zoklxgh.mongodb.net/software-2?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to database', err);
  });

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/get-by-artist', async (req: Request, res: Response) => {
  const artist = req.body.artist;
  const [track] = await MusicModel.findByArtist(artist);

  if (!track) {
    return res.status(404).send('Artist not found');
  }

  return res.status(200).json(track);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
