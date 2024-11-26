import React, { useState } from 'react';

function Card({ carro, buscarCarros }) {
  const [editedCar, setEditedCar] = useState({ ...carro });
  const [isAluguelModalOpen, setIsAluguelModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [aluguelData, setAluguelData] = useState({
    id_usuario: '',
    data_aluguel: ''
  });

  const alterarSituacao = async (novaSituacao) => {
    if (novaSituacao === 'alugado') {
      setIsAluguelModalOpen(true);
    } else {
      await atualizarCarro(novaSituacao);
    }
  };

  const atualizarCarro = async (novaSituacao, dadosAluguel = null) => {
    const body = { ...carro, status: novaSituacao };
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

  const editarCarro = async () => {
    await fetch(`http://localhost:3000/carros/${carro.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedCar)
    });
    buscarCarros();
    setIsEditModalOpen(false);
  };

  const deletarCarro = async () => {
    const confirmed = window.confirm("Tem certeza de que deseja deletar este carro?");
    if (confirmed) {
      await fetch(`http://localhost:3000/carros/${carro.id}`, { method: 'DELETE' });
      buscarCarros();
    }
  };

  return (
    <div className="card">
      <h3>{carro.modelo}</h3>
      <p>Cor: {carro.cor}</p>
      <p>KM: {carro.km}</p>
      {/* <p>Situação: {carro.status}</p> */}
      
      {carro.status === 'disponivel' && (
        <>
          <button onClick={() => alterarSituacao('alugado')}>Alugar</button>
          <button onClick={() => alterarSituacao('manutencao')}>Manutenção</button>
        </>
      )}

      {carro.status === 'alugado' && (
        <button onClick={() => alterarSituacao('disponivel')}>Devolver</button>
      )}

      {carro.status === 'manutencao' && (
        <button onClick={() => alterarSituacao('disponivel')}>Encerrar Manutenção</button>
      )}

      <button onClick={() => setIsEditModalOpen(true)}>Editar</button>
      <button onClick={deletarCarro}>Deletar</button>

      {isAluguelModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registrar Aluguel</h2>
            <input
              placeholder="ID do Usuário"
              value={aluguelData.id_usuario}
              onChange={(e) => setAluguelData({ ...aluguelData, id_usuario: e.target.value })}
            />
            <input
              type="date"
              value={aluguelData.data_aluguel}
              onChange={(e) => setAluguelData({ ...aluguelData, data_aluguel: e.target.value })}
            />
            <button onClick={salvarAluguel}>Confirmar Aluguel</button>
            <button onClick={() => setIsAluguelModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Carro</h2>
            <input
              value={editedCar.modelo}
              onChange={(e) => setEditedCar({ ...editedCar, modelo: e.target.value })}
              placeholder="Modelo"
            />
            <input
              value={editedCar.cor}
              onChange={(e) => setEditedCar({ ...editedCar, cor: e.target.value })}
              placeholder="Cor"
            />
            <input
              type="number"
              value={editedCar.km}
              onChange={(e) => setEditedCar({ ...editedCar, km: parseInt(e.target.value) })}
              placeholder="KM"
            />
            <button onClick={editarCarro}>Salvar</button>
            <button onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
