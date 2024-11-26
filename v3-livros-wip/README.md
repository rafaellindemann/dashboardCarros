
//todo: atualizar para 2 tabelas

temp
estudantes: matrícula, nome completo, data de nascimento, e-mail e telefone

==================================================
Estudante:
  id, 
  nome, 
  e-mail.

Livro:
  id do livro, 
  id do usuário, 
  nome do livro, 
  categoria,
  estado (novo, normal e antigo), 
  data de lançamento 
  status (disponivel, emprestado e indisponivel)
  -------------------------------------------------



==================================================








# dashboardBiblioteca
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

Um dashboard simples full JS e postgres para uma locadora de carros, classificando eles entre os status de:
- 'uso' para carros disponíveis para aluguel;
- 'alugado' para carros que se encontram alugados por algum cliente;
- 'manutencao' para carros que estão indisponíveis por estarem em processo de manutenção.


# BD PostgreSQL

## Criação da tabela de livros
Abra o pgAdmin (ou qualquer outra ferramenta que lide com PostgreSQL) e execute o script SQL para criar a tabela de carros:

```

-- Tabela de livros
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES estudantes(id),
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('novo', 'normal', 'antigo')),
    data_lancamento DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'emprestado', 'indisponivel'))
);
```

Detalhes dos campos:
id: Identificador único, gerado automaticamente.
modelo: Nome do modelo do carro.
cor: Cor do carro.
km: Quilometragem do carro, garantindo que seja um valor positivo.
placa: Placa do carro, garantindo que seja única.
situacao: Situação do carro, permitindo apenas os valores uso, alugado, ou manutencao.


## Criação de registros iniciais pra testes
Execute esta query para inserir 10 carros para iniciar a diversão:
```
INSERT INTO livros (nome, categoria, estado, data_lancamento, status)
VALUES 
('Duna', 'Ficção Científica', 'normal', '1965-08-01', 'disponivel'),
('Neuromancer', 'Ficção Científica', 'normal', '1984-07-01', 'disponivel'),
('1984', 'Ficção Científica', 'antigo', '1949-06-08', 'disponivel'),
('Fundação', 'Ficção Científica', 'antigo', '1951-05-01', 'disponivel'),
('O Senhor dos Anéis: A Sociedade do Anel', 'Fantasia', 'antigo', '1954-07-29', 'disponivel'),
('O Hobbit', 'Fantasia', 'antigo', '1937-09-21', 'disponivel'),
('Guerra dos Mundos', 'Ficção Científica', 'antigo', '1898-01-01', 'disponivel'),
('O Guia do Mochileiro das Galáxias', 'Ficção Científica', 'normal', '1979-10-12', 'disponivel'),
('As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa', 'Fantasia', 'antigo', '1950-10-16', 'disponivel'),
('O Nome do Vento', 'Fantasia', 'novo', '2007-03-27', 'disponivel');


```

## Criação da tabela de estudantes
Execute esta query para criar a tabela de estudantes:
```
  -- Tabela de estudantes
CREATE TABLE estudantes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO estudantes (nome, email)
VALUES 
('Albert Einstein', 'albert.einstein@example.com'),
('Marie Curie', 'marie.curie@example.com'),
('Isaac Newton', 'isaac.newton@example.com'),
('Charles Darwin', 'charles.darwin@example.com'),
('Nikola Tesla', 'nikola.tesla@example.com');

```


# backend

### Criação do projeto em node 
***Este passo não precisa ser executado se você clonou este repositório, apenas para recriar o projeto do zerão.***

Para criar o projeto em Node, **na pasta 'backend'** execute o comando de inicialização e depois converse com o terminal:
```
npm init -y
```


Depois disso é pra ter aparecido o arquivo package.json na pasta 'backend'.

## Dependências do backend
Chegou a hora de instalar as dependências. Não são muitas, mas são de verdade...

Se você clonou o projeto, apenas rode:
```
npm install
```
Automagicamente todas as dependências serão instaladas. Agora pule para o passo 'Rodar o server'. 


---

Mas se tu tá criando do zero, segue o fio do tio.
> **Instalar as dependências manualmente:**

> Nodemon para facilitar a rodação e o atualizamento do server:
```
npm i nodemon --save-dev
```
> Express pra facilitar tua vida criando o server
```
npm i express
```

> Biblioteca pg porque ela sabe conversar com um banco PostgreSQL melhor que tu
```
npm i pg
```

> Biblioteca cors pra teu front depois poder conversar com o back
```
npm i cors
```

> Aproveita e já coloca no package.json o script pra rodar o server. Lá no objetinho de scripts deve ter um chamado 'tests'. Arranca ele fora o põe o seguinte no lugar: 
```
"start": "nodemon src/index.js"
```

> O arquivo 'package.json' deve estar mais ou menos como isso aqui:
```
{
  "name": "dashboardcarros",
  "version": "1.0.0",
  "description": "",
  "main": "src/server.js",
  "scripts": {
    "start": "nodemon src/index.js"
  },
  "keywords": [
    "react",
    "node",
    "postgresql",
    "dashboard"
  ],
  "author": "Rafael",
  "license": "MIT",
  "devDependencies": {
    "nodemon": "^3.1.7"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.1",
    "pg": "^8.13.0"
  }
}

```

---


## Rodar o server
```
npm start
```

Nesse momento, se acessar a url 'http://localhost:3000/livros' no navegador você já deve receber a resposta com um array talvez até com uns livrinhos...

