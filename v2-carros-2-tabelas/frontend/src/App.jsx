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

  // versão compacta que serve para todos os status
  const filtroCarrosPorStatus = (status) => carros.filter(carro => carro.status === status);

  // versão para criar uma função para cada status diferente (usei no disponivel para exemplificar)
  function filtrarDisponiveis(){
    return carros.filter(carro => carro.status === 'disponivel');
  }

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
          {/* {filtroCarrosPorStatus('disponivel').map(carro => (
            <Card key={carro.id} carro={carro} buscarCarros={buscarCarros} clientes={clientes} />
          ))} */}
          {filtrarDisponiveis().map(carro => (
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