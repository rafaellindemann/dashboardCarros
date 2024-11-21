import React, { useState } from 'react';

function CarroCard({ carro, buscarCarros }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCar, setEditedCar] = useState({ ...carro });

    const alterarSituacao = async (novaSituacao) => {
        await fetch(`http://localhost:3000/carros/${carro.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...carro, situacao: novaSituacao })
        });
        buscarCarros();
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
            await fetch(`http://localhost:3000/carros/${carro.id}`, {
                method: 'DELETE',
            });
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
                <button onClick={() => alterarSituacao('uso')}>Disponível</button>
            )}

            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={deletarCarro}>Deletar</button>

            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Editar Carro</h3>
                        <label>
                            Modelo:
                            <input
                                type="text"
                                value={editedCar.modelo}
                                onChange={(e) => setEditedCar({ ...editedCar, modelo: e.target.value })}
                            />
                        </label>
                        <label>
                            Cor:
                            <input
                                type="text"
                                value={editedCar.cor}
                                onChange={(e) => setEditedCar({ ...editedCar, cor: e.target.value })}
                            />
                        </label>
                        <label>
                            KM:
                            <input
                                type="number"
                                value={editedCar.km}
                                onChange={(e) => setEditedCar({ ...editedCar, km: Number(e.target.value) })}
                            />
                        </label>
                        <label>
                            Placa:
                            <input
                                type="text"
                                value={editedCar.placa}
                                onChange={(e) => setEditedCar({ ...editedCar, placa: e.target.value })}
                            />
                        </label>
                        <div className="modal-buttons">
                            <button onClick={editarCarro}>Salvar</button>
                            <button onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarroCard;
