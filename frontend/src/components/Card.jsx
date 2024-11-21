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
    <div className="card">
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
      {isEditing && (
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
      )}
      {!isEditing && (
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


