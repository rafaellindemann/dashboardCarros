const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'alugaCarros',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(cors());
app.use(express.json());

app.get('/carros', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM carros');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar carros' });
  }
});

app.get('/carros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM carros WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar carro' });
  }
});

app.post('/carros', async (req, res) => {
  const { modelo, cor, km } = req.body;
  try {
    const [rows] = await pool.query(
      'INSERT INTO carros (modelo, cor, km) VALUES (?, ?, ?)',
      [modelo, cor, km]
    );
    const [novo] = await pool.query('SELECT * FROM carros WHERE id = ?', [rows.insertId]);
    res.status(201).json(novo[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao adicionar carro' });
  }
});

app.put('/carros/:id', async (req, res) => {
  const { id } = req.params;
  const { modelo, cor, km, id_usuario, data_aluguel, status } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE carros SET modelo = ?, cor = ?, km = ?, id_usuario = ?, data_aluguel = ?, status = ? WHERE id = ?',
      [modelo, cor, km, id_usuario, data_aluguel, status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    const [atualizado] = await pool.query('SELECT * FROM carros WHERE id = ?', [id]);
    res.json(atualizado[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao atualizar carro' });
  }
});

app.delete('/carros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM carros WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
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
    const [rows] = await pool.query(
      'INSERT INTO clientes (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    const [novo] = await pool.query('SELECT * FROM clientes WHERE id = ?', [rows.insertId]);
    res.status(201).json(novo[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao adicionar cliente' });
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
