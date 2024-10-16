import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
<<<<<<< Updated upstream
  res.send('hello world');
=======
  res.json('welcome to the API');
  console.log('welcome to the API');
>>>>>>> Stashed changes
});

export { router as indexRoutes };