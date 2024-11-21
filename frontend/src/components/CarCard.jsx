import React, { useState } from 'react';

function CarCard({ carro, buscarCarros }) {
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

    const handleEditCar = async () => {
        await fetch(`http://localhost:3000/carros/${carro.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedCar)
        });
        buscarCarros();
        setIsEditing(false);
    };

    const handleDeleteCar = async () => {
        const confirmed = window.confirm("Tem certeza de que deseja deletar este carro?");
        if (confirmed) {
            await fetch(`http://localhost:3000/carros/${carro.id}`, {
                method: 'DELETE',
            });
            buscarCarros();
        }
    };

    return (
        <div className="car-card">
            <h3>{carro.modelo}</h3>
            <p>Marca: {carro.marca}</p>
            
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
            <button onClick={handleDeleteCar}>Deletar</button>

            {/* modal de edit tá doido, mostra marca que não existe e não mostra o resto*** */}

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
                            Marca:
                            <input
                                type="text"
                                value={editedCar.marca}
                                onChange={(e) => setEditedCar({ ...editedCar, marca: e.target.value })}
                            />
                        </label>
                        <div className="modal-buttons">
                            <button onClick={handleEditCar}>Salvar</button>
                            <button onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarCard;
