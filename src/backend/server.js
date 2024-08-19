const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const Game = require('./models/Game');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Sincronizar o Banco de Dados
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Definir rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
