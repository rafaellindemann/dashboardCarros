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
    placa: '',
  });
  const [novoCliente, setNovoCliente] = useState({
    cpf: '',
    nome_completo: '',
    data_nascimento: '',
    email: '',
    telefone: '',
  });

  const filtroCarrosPorSituacao = (situacao) => carros.filter(carro => carro.situacao === situacao);

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
        body: JSON.stringify({ ...novoCarro, situacao: 'uso' }),
      });
      setIsAddingCarro(false);
      setNovoCarro({ modelo: '', cor: '', km: 0, placa: '' });
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
      setNovoCliente({ cpf: '', nome_completo: '', data_nascimento: '', email: '', telefone: '' });
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
          <h2>Em Uso</h2>
          {filtroCarrosPorSituacao('uso').map(carro => (
            <Card key={carro.id} carro={carro} buscarCarros={buscarCarros} clientes={clientes} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Alugados</h2>
          {filtroCarrosPorSituacao('alugado').map(carro => (
            <Card key={carro.id} carro={carro} buscarCarros={buscarCarros} clientes={clientes} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Em Manutenção</h2>
          {filtroCarrosPorSituacao('manutencao').map(carro => (
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
            <input
              placeholder="Placa"
              value={novoCarro.placa}
              onChange={(e) => setNovoCarro({ ...novoCarro, placa: e.target.value })}
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
              placeholder="CPF"
              value={novoCliente.cpf}
              onChange={(e) => setNovoCliente({ ...novoCliente, cpf: e.target.value })}
            />
            <input
              placeholder="Nome Completo"
              value={novoCliente.nome_completo}
              onChange={(e) => setNovoCliente({ ...novoCliente, nome_completo: e.target.value })}
            />
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={novoCliente.data_nascimento}
              onChange={(e) => setNovoCliente({ ...novoCliente, data_nascimento: e.target.value })}
            />
            <input
              placeholder="Email"
              value={novoCliente.email}
              onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
            />
            <input
              placeholder="Telefone"
              value={novoCliente.telefone}
              onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
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


// import React, { useEffect, useState } from 'react';
// import CarroCard from './components/CarroCard';

// function App() {
//     const [carros, setCarros] = useState([]);
//     const [clientes, setClientes] = useState([]);
//     const [isAddingCarro, setIsAddingCarro] = useState(false);
//     const [isAddingCliente, setIsAddingCliente] = useState(false);

//     const [novoCarro, setNovoCarro] = useState({
//         modelo: '',
//         cor: '',
//         km: 0,
//         placa: '',
//     });

//     const [novoCliente, setNovoCliente] = useState({
//         cpf: '',
//         nome_completo: '',
//         data_nascimento: '',
//         email: '',
//         telefone: '',
//     });

//     const filtroCarrosPorSituacao = (situacao) => carros.filter(carro => carro.situacao === situacao);

//     function adicionarCarro() {
//         setIsAddingCarro(true);
//     }

//     function adicionarCliente() {
//         setIsAddingCliente(true);
//     }

//     const salvarCarro = async () => {
//         try {
//             await fetch('http://localhost:3000/carros', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ ...novoCarro, situacao: 'uso' }),
//             });
//             setIsAddingCarro(false);
//             setNovoCarro({ modelo: '', cor: '', km: 0, placa: '' });
//             buscarCarros();
//         } catch (error) {
//             console.error('Erro ao salvar carro:', error);
//         }
//     };

//     const salvarCliente = async () => {
//         try {
//             await fetch('http://localhost:3000/clientes', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(novoCliente),
//             });
//             setIsAddingCliente(false);
//             setNovoCliente({ cpf: '', nome_completo: '', data_nascimento: '', email: '', telefone: '' });
//             buscarClientes();
//         } catch (error) {
//             console.error('Erro ao salvar cliente:', error);
//         }
//     };

//     const buscarCarros = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/carros');
//             const data = await response.json();
//             setCarros(data);
//         } catch (error) {
//             console.error('Erro ao buscar carros:', error);
//         }
//     };

//     const buscarClientes = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/clientes');
//             const data = await response.json();
//             setClientes(data);
//         } catch (error) {
//             console.error('Erro ao buscar clientes:', error);
//         }
//     };

//     useEffect(() => {
//         buscarCarros();
//         buscarClientes();
//     }, []);

//     return (
//         <div className="App">
//             <header>
//                 <h1>Controle de Frota</h1>
//                 <div>
//                     <button onClick={adicionarCarro}>Novo Carro</button>
//                     <button onClick={adicionarCliente}>Novo Cliente</button>
//                 </div>
//             </header>

//             <div className="dashboard">
//                 <div className="coluna-dashboard">
//                     <h2>Uso</h2>
//                     {filtroCarrosPorSituacao('uso').map(carro => (
//                         <CarroCard key={carro.id} carro={carro} buscarCarros={buscarCarros} />
//                     ))}
//                 </div>
//                 <div className="coluna-dashboard">
//                     <h2>Alugados</h2>
//                     {filtroCarrosPorSituacao('alugado').map(carro => (
//                         <CarroCard key={carro.id} carro={carro} buscarCarros={buscarCarros} />
//                     ))}
//                 </div>
//                 <div className="coluna-dashboard">
//                     <h2>Manutenção</h2>
//                     {filtroCarrosPorSituacao('manutencao').map(carro => (
//                         <CarroCard key={carro.id} carro={carro} buscarCarros={buscarCarros} />
//                     ))}
//                 </div>
//             </div>

//             {isAddingCarro && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Cadastrar Novo Carro</h3>
//                         <label>
//                             Modelo:
//                             <input
//                                 type="text"
//                                 value={novoCarro.modelo}
//                                 onChange={(e) => setNovoCarro({ ...novoCarro, modelo: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Cor:
//                             <input
//                                 type="text"
//                                 value={novoCarro.cor}
//                                 onChange={(e) => setNovoCarro({ ...novoCarro, cor: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             KM:
//                             <input
//                                 type="number"
//                                 value={novoCarro.km}
//                                 onChange={(e) => setNovoCarro({ ...novoCarro, km: Number(e.target.value) })}
//                             />
//                         </label>
//                         <label>
//                             Placa:
//                             <input
//                                 type="text"
//                                 value={novoCarro.placa}
//                                 onChange={(e) => setNovoCarro({ ...novoCarro, placa: e.target.value })}
//                             />
//                         </label>
//                         <div className="modal-buttons">
//                             <button onClick={salvarCarro}>Salvar</button>
//                             <button onClick={() => setIsAddingCarro(false)}>Cancelar</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {isAddingCliente && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Cadastrar Novo Cliente</h3>
//                         <label>
//                             CPF:
//                             <input
//                                 type="text"
//                                 value={novoCliente.cpf}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, cpf: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Nome Completo:
//                             <input
//                                 type="text"
//                                 value={novoCliente.nome_completo}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, nome_completo: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Data de Nascimento:
//                             <input
//                                 type="date"
//                                 value={novoCliente.data_nascimento}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, data_nascimento: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             E-mail:
//                             <input
//                                 type="email"
//                                 value={novoCliente.email}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Telefone:
//                             <input
//                                 type="text"
//                                 value={novoCliente.telefone}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
//                             />
//                         </label>
//                         <div className="modal-buttons">
//                             <button onClick={salvarCliente}>Salvar</button>
//                             <button onClick={() => setIsAddingCliente(false)}>Cancelar</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;

