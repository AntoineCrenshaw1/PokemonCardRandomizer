import express from 'express';
import debug from 'debug';
import dotenv from 'dotenv';
import { indexRoutes } from './routes/index.js';

dotenv.config();

const debugServer = debug('app:server');
const app = express();

app.use(express.urlencoded({ extended: true }));
<<<<<<< Updated upstream
app.use(express.static('frontend/dist'))

app.use('/', indexRoutes);


app.use(express.static('frontend/dist'));
=======
app.use(express.json());
app.use(express.static('frontend/dist'));

app.use('/', indexRoutes);

// Error handling middleware
app.use((err, req,res, next) => {
  debugServer(`Error: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});
>>>>>>> Stashed changes

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debugServer(`Server is running on http://localhost:${port}`);
});
