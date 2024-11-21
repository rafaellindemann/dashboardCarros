import React, { useEffect, useState } from 'react';
import CarCard from './components/CarCard';

function App() {
    const [carros, setCarros] = useState([]);
    const filtroCarrosPorSituacao = (situacao) => carros.filter(carro => carro.situacao === situacao);

    function adicionarCarro() {
        // Lógica para abrir modal de novo carro
    }

    function adicionarCliente() {
        // Lógica para abrir modal de novo cliente
    }

    // Função para buscar todos os carros
    const buscarCarros = async () => {
        try {
            const response = await fetch('http://localhost:3000/carros');
            const data = await response.json();
            setCarros(data);
        } catch (error) {
            console.error('Erro ao buscar carros:', error);
        }
    };

    useEffect(() => {
        buscarCarros();
    }, []);

    useEffect(() => {
        console.log(carros);
    }, [carros]);

    return (
        <div className="App">
            <header>
                <h1>Controle de Frota</h1>
                <div>
                    <button onClick={adicionarCarro}>Novo Carro</button>
                    <button onClick={adicionarCliente}>Novo Cliente</button>
                </div>
            </header>

            <div className="dashboard">
                <div className="coluna-dashboard">
                    <h2>Uso</h2>
                    {filtroCarrosPorSituacao('uso').map(carro => (
                        <CarCard key={carro.id} carro={carro} buscarCarros={buscarCarros} />
                    ))}
                </div>
                <div className="coluna-dashboard">
                    <h2>Alugados</h2>
                    {filtroCarrosPorSituacao('alugado').map(carro => (
                        <CarCard key={carro.id} carro={carro} buscarCarros={buscarCarros} />
                    ))}
                </div>
                <div className="coluna-dashboard">
                    <h2>Manutenção</h2>
                    {filtroCarrosPorSituacao('manutencao').map(carro => (
                        <CarCard key={carro.id} carro={carro} buscarCarros={buscarCarros} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;



// import React, { useEffect, useState } from 'react';
// import BookCard from './components/BookCard';

// function App() {
//     const [books, setBooks] = useState([]);
//     const filterBooksByStatus = (status) => books.filter(book => book.status === status);

//     function handleAddBook(){
//       // Lógica para abrir modal de novo livro
//     }

//     function handleAddStudent(){
//       // Lógica para abrir modal de novo estudante
//     }

//     // Função para buscar todos os livros
//     const fetchBooks = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/livros');
//             const data = await response.json();
//             setBooks(data);
//         } catch (error) {
//             console.error('Erro ao buscar livros:', error);
//         }
//     };

//     useEffect(() => {
//         fetchBooks();
//     }, []);

//     return (
//         <div className="App">
//             <header>
//               <h1>Biblioteca Escolar</h1>
//               <div>
//                   <button onClick={handleAddBook}>Novo Livro</button>
//                   <button onClick={handleAddStudent}>Novo Estudante</button>
//               </div>
//             </header>

//             <div className="dashboard">
//               <div className='coluna-dashboard'>
//                   <h2>Disponíveis</h2>
//                   {filterBooksByStatus('disponivel').map(book => (
//                       <BookCard key={book.codigo} book={book} fetchBooks={fetchBooks} />
//                   ))}
//               </div>
//               <div className='coluna-dashboard'>
//                   <h2>Emprestados</h2>
//                   {filterBooksByStatus('emprestado').map(book => (
//                       <BookCard key={book.codigo} book={book} fetchBooks={fetchBooks} />
//                   ))}
//               </div>
//               <div className='coluna-dashboard'>
//                   <h2>Indisponíveis</h2>
//                   {filterBooksByStatus('indisponivel').map(book => (
//                       <BookCard key={book.codigo} book={book} fetchBooks={fetchBooks} />
//                   ))}
//               </div>
//             </div>            
//         </div>
//     );
// }

// export default App;
