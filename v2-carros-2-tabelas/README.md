
//todo: atualizar para 2 tabelas

# dashboardCarros
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

Um dashboard simples full JS e postgres para uma locadora de carros, classificando eles entre os status de:
- 'uso' para carros disponíveis para aluguel;
- 'alugado' para carros que se encontram alugados por algum cliente;
- 'manutencao' para carros que estão indisponíveis por estarem em processo de manutenção.


# BD PostgreSQL

## Criação da tabela de carros
Abra o pgAdmin (ou qualquer outra ferramenta que lide com PostgreSQL) e execute o script SQL para criar a tabela de carros:

```
Scrips para criar e popular as tabelas no arquivo 'createDB.md'
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

Nesse momento, se acessar a url 'http://localhost:3000/carros' no navegador você já deve receber a resposta com um arrays dos 10 carros...

