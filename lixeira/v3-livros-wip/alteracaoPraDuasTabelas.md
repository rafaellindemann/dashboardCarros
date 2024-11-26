Para adaptar o projeto conforme as novas especificações, faremos alterações nos arquivos principais e criaremos um novo script SQL para as tabelas. Vou detalhar as mudanças necessárias:

1. Script SQL para criar as novas tabelas:

```sql
-- Tabela de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de carros
CREATE TABLE carros (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES clientes(id),
    modelo VARCHAR(100) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    km INTEGER NOT NULL CHECK (km >= 0),
    data_aluguel DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'alugado', 'manutencao'))
);

INSERT INTO clientes (nome, email) VALUES ('João Silva', 'joao.silva@example.com');
INSERT INTO clientes (nome, email) VALUES ('Maria Oliveira', 'maria.oliveira@example.com');
INSERT INTO clientes (nome, email) VALUES ('Pedro Santos', 'pedro.santos@example.com');
INSERT INTO clientes (nome, email) VALUES ('Ana Paula', 'ana.paula@example.com');
INSERT INTO clientes (nome, email) VALUES ('Carlos Pereira', 'carlos.pereira@example.com');

INSERT INTO carros (modelo, cor, km, status) VALUES ('Fusca', 'azul', 100000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Civic', 'preto', 25000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Focus', 'branco', 30000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Ka', 'vermelho', 40000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Onix', 'cinza', 15000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Corolla', 'prata', 5000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Kwid', 'amarelo', 20000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Tracker', 'verde', 18000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Tucson', 'azul', 22000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('HB20', 'branco', 13000, 'disponivel');

```

2. Alterações no arquivo index.js (backend):

Linhas 13-14: Alterar o nome do banco de dados:
```javascript
database: 'aluguelCarros', // Nome da sua database
```

Linhas 26-104: Atualizar as rotas de carros:
```javascript
// Rota para buscar todos os carros
app.get('/carros', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM carros');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar carros' });
  }
});

// Rota para buscar um carro por ID
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

// Rota para adicionar um carro
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

// Rota para atualizar um carro
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
```

Linhas 148-171: Atualizar as rotas de clientes:
```javascript
// Rota para adicionar um cliente
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

// Rota para buscar todos os clientes
app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});
```

3. Alterações no arquivo App.jsx:

Linhas 8-19: Atualizar os estados iniciais:
```javascript
const [novoCarro, setNovoCarro] = useState({
  modelo: '',
  cor: '',
  km: 0,
});

const [novoCliente, setNovoCliente] = useState({
  nome: '',
  email: '',
});
```

Linhas 30-70: Atualizar as funções de salvar e buscar:
```javascript
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
```

4. Alterações no arquivo Card.jsx:

Linhas 6-11: Atualizar o estado de aluguel:
```javascript
const [aluguelData, setAluguelData] = useState({
  id_usuario: '',
  data_aluguel: ''
});
```

Linhas 13-50: Atualizar as funções de alteração de status e atualização:
```javascript
const alterarStatus = async (novoStatus) => {
  if (novoStatus === 'alugado') {
    setIsAluguelModalOpen(true);
  } else {
    await atualizarCarro(novoStatus);
  }
};

const atualizarCarro = async (novoStatus, dadosAluguel = null) => {
  const body = { ...carro, status: novoStatus };
  if (dadosAluguel) {
    body.id_usuario = dadosAluguel.id_usuario;
    body.data_aluguel = dadosAluguel.data_aluguel;
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
  setAluguelData({ id_usuario: '', data_aluguel: '' });
};
```

Estas alterações adaptam o projeto para a nova estrutura de tabelas, removendo a necessidade da tabela de relacionamento 'alugueis' e incorporando as informações de aluguel diretamente na tabela 'carros'. Lembre-se de ajustar o frontend para refletir essas mudanças, especialmente no modal de aluguel e na exibição das informações do carro.

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/40805087/e5e30f39-7449-41c7-8dfd-40c863bd446f/index.js
[2] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/40805087/52447bba-40ad-4ab4-a34b-605753f7b901/index.css
[3] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/40805087/c18acd99-9d70-4a81-a994-40920a09530f/App.jsx
[4] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/40805087/5e096d23-c6d6-4f86-acf1-10b6dea1ce96/Card.jsx
[5] https://cursos.alura.com.br/forum/topico-exercicio-sql-266772
[6] https://docentes.ifrn.edu.br/josecunha/disciplinas/banco-de-dados/material-de-aula/banco-i-exemplos