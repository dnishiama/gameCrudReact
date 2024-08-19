import React, { useState, useEffect } from 'react';
import gameService from '../services/gameService';

const Home = () => {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({ title: '', genre: '', releaseDate: '' });
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    const res = await gameService.getGames();
    setGames(res.data);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editingGame) {
      await gameService.updateGame(editingGame.id, formData);
      setEditingGame(null);
    } else {
      await gameService.createGame(formData);
    }
    setFormData({ title: '', genre: '', releaseDate: '' });
    loadGames();
  };

  const onEdit = (game) => {
    setEditingGame(game);
    setFormData(game);
  };

  const onDelete = async (id) => {
    await gameService.deleteGame(id);
    loadGames();
  };

  return (
    <div>
      <h1>Games</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={onChange}
          placeholder="Genre"
          required
        />
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={onChange}
          required
        />
        <button type="submit">{editingGame ? 'Update' : 'Create'} Game</button>
      </form>

      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.title} - {game.genre} - {new Date(game.releaseDate).toLocaleDateString()}
            <button onClick={() => onEdit(game)}>Edit</button>
            <button onClick={() => onDelete(game.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
