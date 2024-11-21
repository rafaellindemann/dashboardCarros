Claro, vou montar os arquivos atualizados para você, incorporando as mudanças necessárias para refletir a nova estrutura do projeto.

index.js:

```javascript
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aluguelCarros',
  password: 'postgre',
  port: 5432,
});

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
```

App.jsx:

```jsx
import React, { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
  const [carros, setCarros] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [isAddingCarro, setIsAddingCarro] = useState(false);
  const [isAddingCliente, setIsAddingCliente] = useState(false);
  const [novoCarro, setNovoCarro] = useState({
    modelo: '',
    cor: '',
    km: 0,
  });
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    email: '',
  });

  const filtroCarrosPorStatus = (status) => carros.filter(carro => carro.status === status);

  function adicionarCarro() {
    setIsAddingCarro(true);
  }

  function adicionarCliente() {
    setIsAddingCliente(true);
  }

  const salvarCarro = async () => {
    try {
      await fetch('http://localhost:3000/carros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCarro),
      });
      setIsAddingCarro(false);
      setNovoCarro({ modelo: '', cor: '', km: 0 });
      buscarCarros();
    } catch (error) {
      console.error('Erro ao salvar carro:', error);
    }
  };

  const salvarCliente = async () => {
    try {
      await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCliente),
      });
      setIsAddingCliente(false);
      setNovoCliente({ nome: '', email: '' });
      buscarClientes();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const buscarCarros = async () => {
    try {
      const response = await fetch('http://localhost:3000/carros');
      const data = await response.json();
      setCarros(data);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
    }
  };

  const buscarClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    buscarCarros();
    buscarClientes();
  }, []);

  return (
    <div>
      <header>
        <h1>Aluga Carros</h1>
        <button onClick={adicionarCarro}>Adicionar Carro</button>
        <button onClick={adicionarCliente}>Adicionar Cliente</button>
      </header>
      <div className="dashboard">
        <div className="coluna-dashboard">
          <h2>Disponível</h2>
          {filtroCarrosPorStatus('disponivel').map(carro => (
            <Card key={carro.id} carro={carro} buscarCarros={buscarCarros} clientes={clientes} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Alugados</h2>
          {filtroCarrosPorStatus('alugado').map(carro => (
            <Card key={carro.id} carro={carro} buscarCarros={buscarCarros} clientes={clientes} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Em Manutenção</h2>
          {filtroCarrosPorStatus('manutencao').map(carro => (
            <Card key={carro.id} carro={carro} buscarCarros={buscarCarros} clientes={clientes} />
          ))}
        </div>
      </div>
      {isAddingCarro && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Carro</h2>
            <input
              placeholder="Modelo"
              value={novoCarro.modelo}
              onChange={(e) => setNovoCarro({ ...novoCarro, modelo: e.target.value })}
            />
            <input
              placeholder="Cor"
              value={novoCarro.cor}
              onChange={(e) => setNovoCarro({ ...novoCarro, cor: e.target.value })}
            />
            <input
              type="number"
              placeholder="KM"
              value={novoCarro.km}
              onChange={(e) => setNovoCarro({ ...novoCarro, km: parseInt(e.target.value) })}
            />
            <button onClick={salvarCarro}>Salvar</button>
            <button onClick={() => setIsAddingCarro(false)}>Cancelar</button>
          </div>
        </div>
      )}
      {isAddingCliente && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Cliente</h2>
            <input
              placeholder="Nome"
              value={novoCliente.nome}
              onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
            />
            <input
              placeholder="Email"
              value={novoCliente.email}
              onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
            />
            <button onClick={salvarCliente}>Salvar</button>
            <button onClick={() => setIsAddingCliente(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
```

Card.jsx:

```jsx
import React, { useState } from 'react';

function Card({ carro, buscarCarros }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCar, setEditedCar] = useState({ ...carro });
  const [isAluguelModalOpen, setIsAluguelModalOpen] = useState(false);
  const [aluguelData, setAluguelData] = useState({
    cpf_cliente: '',
    data_retirada: '',
    data_prevista_entrega: ''
  });

  const alterarSituacao = async (novaSituacao) => {
    if (novaSituacao === 'alugado') {
      setIsAluguelModalOpen(true);
    } else {
      await atualizarCarro(novaSituacao);
    }
  };

  const atualizarCarro = async (novaSituacao, dadosAluguel = null) => {
    const body = { ...carro, situacao: novaSituacao };
    if (dadosAluguel) {
      body.cpf_cliente = dadosAluguel.cpf_cliente;
      body.data_retirada = dadosAluguel.data_retirada;
      body.data_prevista_entrega = dadosAluguel.data_prevista_entrega;
    }
    await fetch(`http://localhost:3000/carros/${carro.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    buscarCarros();
  };

  const salvarAluguel = async () => {
    await atualizarCarro('alugado', aluguelData);
    setIsAluguelModalOpen(false);
    setAluguelData({ cpf_cliente: '', data_retirada: '', data_prevista_entrega: '' });
  };

  const editarCarro = async () => {
    await fetch(`http://localhost:3000/carros/${carro.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedCar)
    });
    buscarCarros();
    setIsEditing(false);
  };

  const deletarCarro = async () => {
    const confirmed = window.confirm("Tem certeza de que deseja deletar este carro?");
    if (confirmed) {
      await fetch(`http://localhost:3000/carros/${carro.id}`, { method: 'DELETE' });
      buscarCarros();
    }
  };

  return (
    <div className="carro-card">
      <h3>{carro.modelo}</h3>
      <p>Cor: {carro.cor}</p>
      <p>KM: {carro.km}</p>
      <p>Placa: {carro.placa}</p>
      <p>Situação: {carro.situacao}</p>
      {carro.situacao === 'uso' && (
        <>
          <button onClick={() => alterarSituacao('alugado')}>Alugar</button>
          <button onClick={() => alterarSituacao('manutencao')}>Manutenção</button>
        </>
      )}
      {carro.situacao === 'alugado' && (
        <button onClick={() => alterarSituacao('uso')}>Devolver</button>
      )}
      {carro.situacao === 'manutencao' && (
        <button onClick={() => alterarSituacao('uso')}>Finalizar Manutenção</button>
      )}
      {isEditing ? (
        <div>
          <input
            value={editedCar.modelo}
            onChange={(e) => setEditedCar({ ...editedCar, modelo: e.target.value })}
          />
          <input
            value={editedCar.cor}
            onChange={(e) => setEditedCar({ ...editedCar, cor: e.target.value })}
          />
          <input
            type="number"
            value={editedCar.km}
            onChange={(e) => setEditedCar({ ...editedCar, km: parseInt(e.target.value) })}
          />
          <input
            value={editedCar.placa}
            onChange={(e) => setEditedCar({ ...editedCar, placa: e.target.value })}
          />
          <button onClick={editarCarro}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={deletarCarro}>Deletar</button>
        </>
      )}
      {isAluguelModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registrar Aluguel</h2>
            <input
              placeholder="CPF do Cliente"
              value={aluguelData.cpf_cliente}
              onChange={(e) => setAluguelData({ ...aluguelData, cpf_cliente: e.target.value })}
            />
            <input
              type="date"
              value={aluguelData.data_retirada}
              onChange={(e) => setAluguelData({ ...aluguelData, data_retirada: e.target.value })}
            />
            <input
              type="date"
              value={aluguelData.data_prevista_entrega}
              onChange={(e) => setAluguelData({ ...aluguelData, data_prevista_entrega: e.target.value })}
            />
            <button onClick={salvarAluguel}>Confirmar Aluguel</button>
            <button onClick={() => setIsAluguelModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;

```

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/40805087/e5e30f39-7449-41c7-8dfd-40c863bd446f/index.js
[2] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/40805087/52447bba-40ad-4ab4-a34b-605753f7b901/index.css
[3] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/40805087/c18acd99-9d70-4a81-a994-40920a09530f/App.jsx
[4] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/40805087/5e096d23-c6d6-4f86-acf1-10b6dea1ce96/Card.jsx