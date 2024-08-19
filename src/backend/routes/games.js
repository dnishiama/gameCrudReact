const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const { verifyToken } = require('../middleware/authMiddleware');

// Create a new game
router.post('/', verifyToken, async (req, res) => {
  const { title, genre, releaseDate } = req.body;
  try {
    const newGame = await Game.create({ title, genre, releaseDate });
    res.json(newGame);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all games
router.get('/', verifyToken, async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a game
router.put('/:id', verifyToken, async (req, res) => {
  const { title, genre, releaseDate } = req.body;
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }
    game.title = title;
    game.genre = genre;
    game.releaseDate = releaseDate;
    await game.save();
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a game
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }
    await game.destroy();
    res.json({ msg: 'Game deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
