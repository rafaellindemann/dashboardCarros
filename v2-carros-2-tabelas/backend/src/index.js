const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'alugaCarros',
  password: 'senai',
  port: 5432,
});

// const pool = new Pool({
//     user: 'local', // Substitua pelo seu usuário do PostgreSQL
//     host: 'localhost',
//     database: 'alugaCarros', // Nome da sua database
//     password: '12345', // Substitua pela sua senha
//     port: 5432, // Porta padrão do PostgreSQL
// });

app.use(cors());
app.use(express.json());

app.get('/carros', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM carros');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar carros' });
  }
});

app.get('/carros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM carros WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar carro' });
  }
});

app.post('/carros', async (req, res) => {
  const { modelo, cor, km } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO carros (modelo, cor, km) VALUES ($1, $2, $3) RETURNING *',
      [modelo, cor, km]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao adicionar carro' });
  }
});

app.put('/carros/:id', async (req, res) => {
  const { id } = req.params;
  const { modelo, cor, km, id_usuario, data_aluguel, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE carros SET modelo = $1, cor = $2, km = $3, id_usuario = $4, data_aluguel = $5, status = $6 WHERE id = $7 RETURNING *',
      [modelo, cor, km, id_usuario, data_aluguel, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao atualizar carro' });
  }
});

app.delete('/carros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM carros WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    res.json({ message: 'Carro deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao deletar carro' });
  }
});

app.post('/clientes', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao adicionar cliente' });
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});