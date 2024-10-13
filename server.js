import express from 'express';
import debug from 'debug';
import dotenv from 'dotenv';
import { indexRoutes } from './routes/index.js';

dotenv.config();

const debugServer = debug('app:server');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend/dist'))

app.use('/', indexRoutes);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debugServer(`Server is running on http://localhost:${port}`);
});
