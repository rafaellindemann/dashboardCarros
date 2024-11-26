import React, { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
    const [livros, setLivros] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isAddingStudent, setIsAddingStudent] = useState(false);
    const [isLending, setIsLending] = useState(false);
    const [novoLivro, setNovoLivro] = useState({
        nome: '',
        categoria: '',
        estado: 'novo',
        data_lancamento: '',
    });
    const [novoEstudante, setNovoEstudante] = useState({
        nome: '',
        email: '',
    });
    const [emprestimo, setEmprestimo] = useState({
        id_usuario: '',
        data_aluguel: '',
    });
    const [livroSelecionado, setLivroSelecionado] = useState(null);

    const filtroLivrosPorStatus = (status) => livros.filter((livro) => livro.status === status);

    function adicionarLivro() {
        setIsAdding(true);
    }

    function adicionarEstudante() {
        setIsAddingStudent(true);
    }

    const salvarLivro = async () => {
        try {
            await fetch('http://localhost:3000/livros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...novoLivro, status: 'disponivel' }),
            });
            setIsAdding(false);
            setNovoLivro({ nome: '', categoria: '', estado: 'novo', data_lancamento: '' });
            buscarLivros();
        } catch (error) {
            console.error('Erro ao salvar livro:', error);
        }
    };

    const salvarEstudante = async () => {
        try {
            await fetch('http://localhost:3000/estudantes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoEstudante),
            });
            setIsAddingStudent(false);
            setNovoEstudante({ nome: '', email: '' });
        } catch (error) {
            console.error('Erro ao salvar estudante:', error);
        }
    };

    const salvarEmprestimo = async () => {
        try {
            await fetch(`http://localhost:3000/livros/${livroSelecionado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...livroSelecionado,
                    id_usuario: emprestimo.id_usuario,
                    data_aluguel: emprestimo.data_aluguel,
                    status: 'emprestado',
                }),
            });
            setIsLending(false);
            setEmprestimo({ id_usuario: '', data_aluguel: '' });
            buscarLivros();
        } catch (error) {
            console.error('Erro ao salvar empréstimo:', error);
        }
    };

    const buscarLivros = async () => {
        try {
            const response = await fetch('http://localhost:3000/livros');
            const data = await response.json();
            setLivros(data);
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };

    useEffect(() => {
        buscarLivros();
    }, []);

    return (
        <div className="App">
            <header>
                <h1>Biblioteca Escolar</h1>
                <div>
                    <button onClick={adicionarLivro}>Novo Livro</button>
                    <button onClick={adicionarEstudante}>Novo Estudante</button>
                </div>
            </header>

            <div className="dashboard">
                <div className="coluna-dashboard">
                    <h2>Disponíveis</h2>
                    {filtroLivrosPorStatus('disponivel').map((livro) => (
                        <Card
                            key={livro.id}
                            item={livro}
                            fetchItems={buscarLivros}
                            onLend={(livro) => {
                                setLivroSelecionado(livro);
                                setIsLending(true);
                            }}
                        />
                    ))}
                </div>
                <div className="coluna-dashboard">
                    <h2>Emprestados</h2>
                    {filtroLivrosPorStatus('emprestado').map((livro) => (
                        <Card key={livro.id} item={livro} fetchItems={buscarLivros} />
                    ))}
                </div>
                <div className="coluna-dashboard">
                    <h2>Indisponíveis</h2>
                    {filtroLivrosPorStatus('indisponivel').map((livro) => (
                        <Card key={livro.id} item={livro} fetchItems={buscarLivros} />
                    ))}
                </div>
            </div>

            {/* Modal para Novo Livro */}
            {isAdding && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Cadastrar Novo Livro</h3>
                        <label>
                            Nome:
                            <input
                                type="text"
                                value={novoLivro.nome}
                                onChange={(e) => setNovoLivro({ ...novoLivro, nome: e.target.value })}
                            />
                        </label>
                        <label>
                            Categoria:
                            <input
                                type="text"
                                value={novoLivro.categoria}
                                onChange={(e) => setNovoLivro({ ...novoLivro, categoria: e.target.value })}
                            />
                        </label>
                        <label>
                            Estado:
                            <select
                                value={novoLivro.estado}
                                onChange={(e) => setNovoLivro({ ...novoLivro, estado: e.target.value })}
                            >
                                <option value="novo">Novo</option>
                                <option value="normal">Normal</option>
                                <option value="antigo">Antigo</option>
                            </select>
                        </label>
                        <label>
                            Data de Lançamento:
                            <input
                                type="date"
                                value={novoLivro.data_lancamento}
                                onChange={(e) => setNovoLivro({ ...novoLivro, data_lancamento: e.target.value })}
                            />
                        </label>
                        <div className="modal-buttons">
                            <button onClick={salvarLivro}>Salvar</button>
                            <button onClick={() => setIsAdding(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Novo Estudante */}
            {isAddingStudent && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Cadastrar Novo Estudante</h3>
                        <label>
                            Nome:
                            <input
                                type="text"
                                value={novoEstudante.nome}
                                onChange={(e) => setNovoEstudante({ ...novoEstudante, nome: e.target.value })}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={novoEstudante.email}
                                onChange={(e) => setNovoEstudante({ ...novoEstudante, email: e.target.value })}
                            />
                        </label>
                        <div className="modal-buttons">
                            <button onClick={salvarEstudante}>Salvar</button>
                            <button onClick={() => setIsAddingStudent(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Empréstimo */}
            {isLending && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Emprestar Livro</h3>
                        <label>
                            ID do Usuário:
                            <input
                                type="text"
                                value={emprestimo.id_usuario}
                                onChange={(e) => setEmprestimo({ ...emprestimo, id_usuario: e.target.value })}
                            />
                        </label>
                        <label>
                            Data do Empréstimo:
                            <input
                                type="date"
                                value={emprestimo.data_aluguel}
                                onChange={(e) => setEmprestimo({ ...emprestimo, data_aluguel: e.target.value })}
                            />
                        </label>
                        <div className="modal-buttons">
                            <button onClick={salvarEmprestimo}>Salvar</button>
                            <button onClick={() => setIsLending(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;



// import React, { useEffect, useState } from 'react';
// import Card from './components/Card'; // Linha 4: Nome corrigido

// function App() {
//     const [livros, setLivros] = useState([]);
//     const [isAdding, setIsAdding] = useState(false);
//     const [novoLivro, setNovoLivro] = useState({
//         nome: '',
//         categoria: '',
//         estado: 'novo',
//         data_lancamento: '',
//     });

//     const filtroLivrosPorStatus = (status) => livros.filter(livro => livro.status === status);

//     function adicionarLivro() {
//         setIsAdding(true);
//     }

//     const salvarLivro = async () => {
//         try {
//             await fetch('http://localhost:3000/livros', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ ...novoLivro, status: 'disponivel' }),
//             });
//             setIsAdding(false);
//             setNovoLivro({ nome: '', categoria: '', estado: 'novo', data_lancamento: '' });
//             buscarLivros();
//         } catch (error) {
//             console.error('Erro ao salvar livro:', error);
//         }
//     };

//     const buscarLivros = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/livros');
//             const data = await response.json();
//             setLivros(data);
//         } catch (error) {
//             console.error('Erro ao buscar livros:', error);
//         }
//     };

//     useEffect(() => {
//         buscarLivros();
//     }, []);

//     return (
//         <div className="App">
//             <header>
//                 <h1>Biblioteca Escolar</h1>
//                 <div>
//                     <button onClick={adicionarLivro}>Novo Livro</button>
//                 </div>
//             </header>

//             <div className="dashboard">
//                 <div className="coluna-dashboard">
//                     <h2>Disponíveis</h2>
//                     {filtroLivrosPorStatus('disponivel').map(livro => (
//                         <Card key={livro.id} item={livro} fetchItems={buscarLivros} /> // Linha 44
//                     ))}
//                 </div>
//                 <div className="coluna-dashboard">
//                     <h2>Emprestados</h2>
//                     {filtroLivrosPorStatus('emprestado').map(livro => (
//                         <Card key={livro.id} item={livro} fetchItems={buscarLivros} /> // Linha 50
//                     ))}
//                 </div>
//                 <div className="coluna-dashboard">
//                     <h2>Indisponíveis</h2>
//                     {filtroLivrosPorStatus('indisponivel').map(livro => (
//                         <Card key={livro.id} item={livro} fetchItems={buscarLivros} /> // Linha 56
//                     ))}
//                 </div>
//             </div>

//             {isAdding && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Cadastrar Novo Livro</h3>
//                         <label>
//                             Nome:
//                             <input
//                                 type="text"
//                                 value={novoLivro.nome}
//                                 onChange={(e) => setNovoLivro({ ...novoLivro, nome: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Categoria:
//                             <input
//                                 type="text"
//                                 value={novoLivro.categoria}
//                                 onChange={(e) => setNovoLivro({ ...novoLivro, categoria: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Estado:
//                             <select
//                                 value={novoLivro.estado}
//                                 onChange={(e) => setNovoLivro({ ...novoLivro, estado: e.target.value })}
//                             >
//                                 <option value="novo">Novo</option>
//                                 <option value="normal">Normal</option>
//                                 <option value="antigo">Antigo</option>
//                             </select>
//                         </label>
//                         <label>
//                             Data de Lançamento:
//                             <input
//                                 type="date"
//                                 value={novoLivro.data_lancamento}
//                                 onChange={(e) => setNovoLivro({ ...novoLivro, data_lancamento: e.target.value })}
//                             />
//                         </label>
//                         <div className="modal-buttons">
//                             <button onClick={salvarLivro}>Salvar</button>
//                             <button onClick={() => setIsAdding(false)}>Cancelar</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;



// import React, { useEffect, useState } from 'react';
// import Card from './components/Card';

// function App() {
//   const [carros, setCarros] = useState([]);
//   const [clientes, setClientes] = useState([]);
//   const [isAddingCarro, setIsAddingCarro] = useState(false);
//   const [isAddingCliente, setIsAddingCliente] = useState(false);
//   const [novoCarro, setNovoCarro] = useState({
//     modelo: '',
//     cor: '',
//     km: 0,
//   });
//   const [novoCliente, setNovoCliente] = useState({
//     nome: '',
//     email: '',
//   });

//   const filtroCarrosPorStatus = (status) => carros.filter(carro => carro.status === status);

//   function adicionarCarro() {
//     setIsAddingCarro(true);
//   }

//   function adicionarCliente() {
//     setIsAddingCliente(true);
//   }

//   const salvarCarro = async () => {
//     try {
//       await fetch('http://localhost:3000/carros', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(novoCarro),
//       });
//       setIsAddingCarro(false);
//       setNovoCarro({ modelo: '', cor: '', km: 0 });
//       buscarCarros();
//     } catch (error) {
//       console.error('Erro ao salvar carro:', error);
//     }
//   };

//   const salvarCliente = async () => {
//     try {
//       await fetch('http://localhost:3000/clientes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(novoCliente),
//       });
//       setIsAddingCliente(false);
//       setNovoCliente({ nome: '', email: '' });
//       buscarClientes();
//     } catch (error) {
//       console.error('Erro ao salvar cliente:', error);
//     }
//   };

//   const buscarCarros = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/carros');
//       const data = await response.json();
//       setCarros(data);
//     } catch (error) {
//       console.error('Erro ao buscar carros:', error);
//     }
//   };

//   const buscarClientes = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/clientes');
//       const data = await response.json();
//       setClientes(data);
//     } catch (error) {
//       console.error('Erro ao buscar clientes:', error);
//     }
//   };

//   useEffect(() => {
//     buscarCarros();
//     buscarClientes();
//   }, []);

//   return (
//     <div>
//       <header>
//         <h1>Aluga Carros</h1>
//         <button onClick={adicionarCarro}>Adicionar Carro</button>
//         <button onClick={adicionarCliente}>Adicionar Cliente</button>
//       </header>
//       <div className="dashboard">
//         <div className="coluna-dashboard">
//           <h2>Disponível</h2>
//           {filtroCarrosPorStatus('disponivel').map(carro => (
//             <Card key={carro.id} carro={carro} buscarCarros={buscarCarros} clientes={clientes} />
//           ))}
//         </div>
//         <div className="coluna-dashboard">
//           <h2>Alugados</h2>
//           {filtroCarrosPorStatus('alugado').map(carro => (
//             <Card key={carro.id} carro={carro} buscarCarros={buscarCarros} clientes={clientes} />
//           ))}
//         </div>
//         <div className="coluna-dashboard">
//           <h2>Em Manutenção</h2>
//           {filtroCarrosPorStatus('manutencao').map(carro => (
//             <Card key={carro.id} carro={carro} buscarCarros={buscarCarros} clientes={clientes} />
//           ))}
//         </div>
//       </div>
//       {isAddingCarro && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Adicionar Carro</h2>
//             <input
//               placeholder="Modelo"
//               value={novoCarro.modelo}
//               onChange={(e) => setNovoCarro({ ...novoCarro, modelo: e.target.value })}
//             />
//             <input
//               placeholder="Cor"
//               value={novoCarro.cor}
//               onChange={(e) => setNovoCarro({ ...novoCarro, cor: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="KM"
//               value={novoCarro.km}
//               onChange={(e) => setNovoCarro({ ...novoCarro, km: parseInt(e.target.value) })}
//             />
//             <button onClick={salvarCarro}>Salvar</button>
//             <button onClick={() => setIsAddingCarro(false)}>Cancelar</button>
//           </div>
//         </div>
//       )}
//       {isAddingCliente && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Adicionar Cliente</h2>
//             <input
//               placeholder="Nome"
//               value={novoCliente.nome}
//               onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
//             />
//             <input
//               placeholder="Email"
//               value={novoCliente.email}
//               onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
//             />
//             <button onClick={salvarCliente}>Salvar</button>
//             <button onClick={() => setIsAddingCliente(false)}>Cancelar</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;