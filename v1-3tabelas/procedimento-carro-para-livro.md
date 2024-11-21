
## Procedimento de Alteração do contexto de aluguel de carros para empréstimo de livros

### 1. Modificações no Backend (index.js)

1. Linha 13: Alterar 'alugaCarros' para 'biblioteca'

2. Linhas 24, 39, 55, 71, 108, 146: Substituir '/carros' por '/livros'

3. Linhas 26, 41, 57, 73, 110: Atualizar as queries SQL:
   - Substituir 'carros' por 'livros'
   - Substituir 'modelo' por 'titulo'
   - Substituir 'cor' por 'autor'
   - Substituir 'km' por 'ano'
   - Substituir 'placa' por 'editora'
   - Manter 'situacao', renomeando para 'status'

4. Linhas 75-77: Atualizar os campos na inserção:
   ```javascript
   const { titulo, autor, ano, editora, status } = req.body;
   'INSERT INTO livros (titulo, autor, ano, editora, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
   [titulo, autor, ano, editora, status]
   ```

5. Linhas 84-86: Atualizar os campos na atualização:
   ```javascript
   const { titulo, autor, ano, editora, status, matricula_estudante, data_retirada, data_prevista_entrega } = req.body;
   'UPDATE livros SET titulo = $1, autor = $2, ano = $3, editora = $4, status = $5 WHERE codigo = $6 RETURNING *',
   [titulo, autor, ano, editora, status, id]
   ```

6. Linhas 93-97: Atualizar a lógica de empréstimo:
   ```javascript
   if (status === 'emprestado') {
     await pool.query(
       'INSERT INTO emprestimos (codigo_livro, matricula_estudante, data_retirada, data_prevista_entrega) VALUES ($1, $2, $3, $4)',
       [id, matricula_estudante, data_retirada, data_prevista_entrega]
     );
   }
   ```

7. Linhas 100-104: Atualizar a lógica de devolução:
   ```javascript
   if (status === 'disponivel') {
     await pool.query(
       'UPDATE emprestimos SET devolucao = true WHERE codigo_livro = $1 AND devolucao = false',
       [id]
     );
   }
   ```

8. Linhas 148-171: Atualizar a rota de clientes para estudantes:
   - Substituir '/clientes' por '/estudantes'
   - Atualizar os campos para corresponder à tabela 'estudantes'

### 2. Modificações no Frontend (App.jsx)

1. Linhas 4-5: Renomear variáveis de estado:
   ```javascript
   const [livros, setLivros] = useState([]);
   const [estudantes, setEstudantes] = useState([]);
   ```

2. Linhas 6-7: Atualizar estados de adição:
   ```javascript
   const [isAddingLivro, setIsAddingLivro] = useState(false);
   const [isAddingEstudante, setIsAddingEstudante] = useState(false);
   ```

3. Linhas 8-19: Atualizar estados de novo livro e novo estudante:
   ```javascript
   const [novoLivro, setNovoLivro] = useState({
     titulo: '',
     autor: '',
     ano: 0,
     editora: '',
   });
   const [novoEstudante, setNovoEstudante] = useState({
     matricula: '',
     nome_completo: '',
     data_nascimento: '',
     email: '',
     telefone: '',
   });
   ```

4. Linha 21: Atualizar função de filtro:
   ```javascript
   const filtroLivrosPorStatus = (status) => livros.filter(livro => livro.status === status);
   ```

5. Linhas 23-28: Atualizar funções de adição:
   ```javascript
   function adicionarLivro() {
     setIsAddingLivro(true);
   }
   function adicionarEstudante() {
     setIsAddingEstudante(true);
   }
   ```

6. Linhas 30-70: Atualizar funções de salvar e buscar:
   - Substituir 'carro' por 'livro' e 'cliente' por 'estudante'
   - Atualizar URLs de fetch para '/livros' e '/estudantes'
   - Ajustar os campos nos objetos de estado

7. Linhas 72-75: Atualizar useEffect:
   ```javascript
   useEffect(() => {
     buscarLivros();
     buscarEstudantes();
   }, []);
   ```

8. Linhas 79-fim: Atualizar o JSX:
   - Mudar títulos e botões para refletir o contexto de biblioteca
   - Atualizar as colunas do dashboard para 'Disponível', 'Emprestado', 'Indisponível'
   - Ajustar os campos nos modais de adição de livro e estudante

### 3. Modificações no Componente Card (Card.jsx)

1. Linha 3: Atualizar props:
   ```javascript
   function Card({ livro, buscarLivros }) {
   ```

2. Linhas 4-5: Atualizar estados:
   ```javascript
   const [isEditing, setIsEditing] = useState(false);
   const [editedBook, setEditedBook] = useState({ ...livro });
   ```

3. Linhas 6-11: Atualizar estados de empréstimo:
   ```javascript
   const [isEmprestimoModalOpen, setIsEmprestimoModalOpen] = useState(false);
   const [emprestimoData, setEmprestimoData] = useState({
     matricula_estudante: '',
     data_retirada: '',
     data_prevista_entrega: ''
   });
   ```

4. Linhas 13-50: Atualizar funções:
   - Substituir 'carro' por 'livro' e 'aluguel' por 'emprestimo'
   - Ajustar lógica para lidar com empréstimos em vez de aluguéis

5. Linhas 52-fim: Atualizar o JSX:
   - Modificar os campos exibidos para refletir as informações do livro
   - Atualizar os botões de ação para 'Emprestar', 'Devolver', 'Marcar como Indisponível'
   - Ajustar o modal de empréstimo para incluir campos relevantes (matrícula do estudante, datas)

Lembre-se de que este procedimento é um guia geral e pode ser necessário fazer ajustes adicionais dependendo da estrutura exata do seu código e de quaisquer funcionalidades específicas que você queira manter ou adicionar.

