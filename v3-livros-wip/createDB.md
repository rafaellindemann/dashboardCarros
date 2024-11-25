
Criação das tabelas:
```
-- Tabela de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de carros
CREATE TABLE carros (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES clientes(id),
    modelo VARCHAR(100) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    km INTEGER NOT NULL CHECK (km >= 0),
    data_aluguel DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'alugado', 'manutencao'))
);
```


Criação de registros de teste:
```
INSERT INTO clientes (nome, email) VALUES ('João Silva', 'joao.silva@example.com');
INSERT INTO clientes (nome, email) VALUES ('Maria Oliveira', 'maria.oliveira@example.com');
INSERT INTO clientes (nome, email) VALUES ('Pedro Santos', 'pedro.santos@example.com');
INSERT INTO clientes (nome, email) VALUES ('Ana Paula', 'ana.paula@example.com');
INSERT INTO clientes (nome, email) VALUES ('Carlos Pereira', 'carlos.pereira@example.com');

INSERT INTO carros (modelo, cor, km, status) VALUES ('Fusca', 'azul', 100000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Civic', 'preto', 25000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Focus', 'branco', 30000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Ka', 'vermelho', 40000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Onix', 'cinza', 15000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Corolla', 'prata', 5000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Kwid', 'amarelo', 20000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Tracker', 'verde', 18000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Tucson', 'azul', 22000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('HB20', 'branco', 13000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Gol', 'vermelho', 35000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Creta', 'prata', 28000, 'alugado');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Uno', 'branco', 50000, 'manutencao');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Renegade', 'laranja', 22000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Sandero', 'azul', 40000, 'alugado');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Toro', 'preto', 15000, 'manutencao');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Fit', 'prata', 30000, 'disponivel');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Argo', 'vermelho', 18000, 'alugado');
INSERT INTO carros (modelo, cor, km, status) VALUES ('Compass', 'verde', 25000, 'manutencao');
INSERT INTO carros (modelo, cor, km, status) VALUES ('T-Cross', 'cinza', 12000, 'disponivel');

```

Criação de registros melhores para clientes:
```

-- Inserindo 30 cientistas como clientes
INSERT INTO clientes (nome, email) VALUES
('Marie Curie', 'marie.curie@science.com'),
('Albert Einstein', 'albert.einstein@science.com'),
('Nikola Tesla', 'nikola.tesla@science.com'),
('Stephen Hawking', 'stephen.hawking@science.com'),
('Ada Lovelace', 'ada.lovelace@science.com'),
('Charles Darwin', 'charles.darwin@science.com'),
('Rosalind Franklin', 'rosalind.franklin@science.com'),
('Neil deGrasse Tyson', 'neil.tyson@science.com'),
('Jane Goodall', 'jane.goodall@science.com'),
('Alan Turing', 'alan.turing@science.com'),
('Katherine Johnson', 'katherine.johnson@science.com'),
('Richard Feynman', 'richard.feynman@science.com'),
('Chien-Shiung Wu', 'chien.shiung.wu@science.com'),
('Carl Sagan', 'carl.sagan@science.com'),
('Dorothy Hodgkin', 'dorothy.hodgkin@science.com'),
('Michio Kaku', 'michio.kaku@science.com'),
('Mae C. Jemison', 'mae.jemison@science.com'),
('Linus Pauling', 'linus.pauling@science.com'),
('Barbara McClintock', 'barbara.mcclintock@science.com'),
('George Washington Carver', 'george.carver@science.com'),
('Tu Youyou', 'tu.youyou@science.com'),
('Subrahmanyan Chandrasekhar', 'subrahmanyan.chandrasekhar@science.com'),
('Françoise Barré-Sinoussi', 'francoise.barre-sinoussi@science.com'),
('Jagadish Chandra Bose', 'jagadish.bose@science.com'),
('Shirley Ann Jackson', 'shirley.jackson@science.com'),
('Kizzmekia Corbett', 'kizzmekia.corbett@science.com'),
('Percy Julian', 'percy.julian@science.com'),
('Gladys West', 'gladys.west@science.com'),
('Donna Strickland', 'donna.strickland@science.com'),
('Sylvia Earle', 'sylvia.earle@science.com');
```

Criação de registros melhores para carros:
```
-- Inserindo 20 carros famosos
INSERT INTO carros (modelo, cor, km, status, id_usuario, data_aluguel) VALUES
('Ecto-1 Ghostbusters', 'Branco', 150000, 'disponivel', NULL, NULL),
('DeLorean DMC-12', 'Prata', 88000, 'disponivel', NULL, NULL),
('Batmóvel 1989', 'Preto', 50000, 'manutencao', NULL, NULL),
('Jeep Wrangler Jurassic Park', 'Verde e Vermelho', 75000, 'alugado', 11, '2024-11-20'),
('Máquina Mistério', 'Verde e Laranja', 100000, 'disponivel', NULL, NULL),
('KITT Knight Rider', 'Preto', 200000, 'alugado', 22, '2024-11-21'),
('Aston Martin DB5 007', 'Prata', 30000, 'disponivel', NULL, NULL),
('Ford Mustang GT Bullitt', 'Verde', 60000, 'alugado', 23, '2024-11-22'),
('Herbie Fusca 53', 'Branco', 250000, 'manutencao', NULL, NULL),
('Dodge Charger Fast & Furious', 'Preto', 80000, 'alugado', 14, '2024-11-23'),
('Fuscão Preto', 'Preto', 90000, 'disponivel', NULL, NULL),
('Mini Cooper The Italian Job', 'Vermelho', 70000, 'disponivel', NULL, NULL),
('Ford Explorer Jurassic Park', 'Verde e Amarelo', 65000, 'alugado', 5, '2024-11-24'),
('Chevrolet Camaro Bumblebee', 'Amarelo', 40000, 'disponivel', NULL, NULL),
('Plymouth Fury Christine', 'Vermelho', 110000, 'manutencao', NULL, NULL),
('Cadillac Miller-Meteor Ecto-1A', 'Branco', 180000, 'disponivel', NULL, NULL),
('Lotus Esprit S1 007', 'Branco', 35000, 'alugado', 6, '2024-11-25'),
('Ford Falcon XB GT Mad Max', 'Preto', 120000, 'disponivel', NULL, NULL),
('Caminhão do João', 'Prata', 95000, 'manutencao', NULL, NULL),
('Chevrolet Corvette Stingray', 'Vermelho', 55000, 'disponivel', NULL, NULL);


```


