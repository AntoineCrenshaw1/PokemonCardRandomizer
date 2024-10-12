if(process.env.NODE_ENV !== 'production') {
  import('dotenv').then((dotenv) => dotenv.config());
}

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
const debugServer = debug('app:server');
const app = express();
import expressLayouts from 'express-ejs-layouts';

import indexRoutes from './routes/index.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

import mongoose from 'mongoose';
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => debugServer('Connected to Database'));

// Error handling middleware
app.use((err, req, res, next) => {
  debugServer(`Error: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  debugServer(`Server is running on http://localhost:${PORT}`);
});
