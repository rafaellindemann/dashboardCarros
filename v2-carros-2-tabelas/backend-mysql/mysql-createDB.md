CREATE DATABASE IF NOT EXISTS alugaCarros;
USE alugaCarros;

```
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
```

```

CREATE TABLE carros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    modelo VARCHAR(100) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    km INT NOT NULL CHECK (km >= 0),
    data_aluguel DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'disponivel',
    FOREIGN KEY (id_usuario) REFERENCES clientes(id),
    CHECK (status IN ('disponivel', 'alugado', 'manutencao'))
);
```


Registros iniciais de usários pra teste
```
INSERT INTO clientes (nome, email) VALUES
('Dona Bete', 'dona.bete@exercicioverso.com'),
('Kowalski', 'kowalski@exercicioverso.com'),
('Guilherme Portões', 'guilherme.portoes@exercicioverso.com'),
('Estevão Trampos', 'estevao.trampos@exercicioverso.com'),
('Heitor Tuga', 'heitor.tuga@exercicioverso.com'),
('Pé Pequeno', 'pe.pequeno@exercicioverso.com'),
('Capitão Ganso', 'capitao.ganso@exercicioverso.com'),
('Junin', 'junin@exercicioverso.com'),
('Padre Ernan Buco', 'padre.ernan.buco@exercicioverso.com'),
('Mônika', 'monika@exercicioverso.com'),
('Mark Scout', 'mark.scout@exercicioverso.com'),
('Cabo Ulisses Soares Barbosa', 'cabo.ulisses.soares.barbosa@exercicioverso.com'),
('Realisa Alisamentos', 'realisa.alisamentos@exercicioverso.com'),
('Jorge Tadeu', 'jorge.tadeu@exercicioverso.com'),
('Pedro Barros', 'pedro.barros@exercicioverso.com'),
('Harry Ploter', 'harry.ploter@exercicioverso.com'),
('Tias Fofinhas', 'tias.fofinhas@exercicioverso.com'),
('Paty em Ação', 'paty.em.acao@exercicioverso.com'),
('GENéZio', 'genezio@exercicioverso.com'),
('Gê Estantes', 'ge.estantes@exercicioverso.com'),
('Gill Bates', 'gill.bates@exercicioverso.com'),
('Bilu', 'bilu@exercicioverso.com'),
('Gael', 'gael@exercicioverso.com'),
('Sarumano', 'sarumano@exercicioverso.com'),
('Amost Radin', 'amost.radin@exercicioverso.com'),
('Lucio Fernando', 'lucio.fernando@exercicioverso.com'),
('Rita Aline', 'rita.aline@exercicioverso.com'),
('Chá Paris', 'cha.paris@exercicioverso.com'),
('Frida Calos', 'frida.calos@exercicioverso.com'),
('Waldisney', 'waldisney@exercicioverso.com'),
('Ron Roni', 'ron.roni@exercicioverso.com'),
('Milhion', 'milhion@exercicioverso.com'),
('Lacre Ação', 'lacre.acao@exercicioverso.com'),
('HMS', 'hms.beagle@exercicioverso.com'),
('Márcia', 'marcia.footer@exercicioverso.com'),
('AdomiCílios', 'adomicilios@exercicioverso.com'),
('Tião', 'tiao@exercicioverso.com'),
('Cristiano', 'cristiano@exercicioverso.com'),
('Cristóvão', 'cristovao@exercicioverso.com'),
('Reciclaudio', 'reciclaudio@exercicioverso.com'),
('Lady Murphy', 'lady.murphy@exercicioverso.com'),
('NAadegas', 'naadegas@exercicioverso.com'),
('Bolores', 'bolores@exercicioverso.com'),
('Abalada', 'abalada@exercicioverso.com'),
('Rango Star', 'rango.star@exercicioverso.com'),
('Pamdiló', 'pamdilo@exercicioverso.com'),
('Hanah Barbearia', 'hanah.barbearia@exercicioverso.com'),
('Acarajéssica', 'acarajessica@exercicioverso.com'),
('Carlos Maria da Silva Telles', 'carlos.telles@exercicioverso.com'),
('Ricárdio', 'ricardio@exercicioverso.com'),
('ALIBEBE', 'alibebe@exercicioverso.com'),
('Cereal Killer', 'cereal.killer@exercicioverso.com'),
('A Bem Suada', 'a.bem.suada@exercicioverso.com'),
('Templo de Salmão', 'templo.salmao@exercicioverso.com'),
('Contra-Filé', 'contra.file@exercicioverso.com'),
('Caio Pontes', 'caio.pontes@exercicioverso.com'),
('Dr Auzio', 'dr.auzio@exercicioverso.com'),
('Isis (@isis1515)', 'isis1515@exercicioverso.com'),
('Zé Roberto', 'ze.roberto@exercicioverso.com'),
('Umberto', 'umberto@exercicioverso.com'),
('Dolores', 'dolores@exercicioverso.com'),
('jamanjo.com.br', 'jamanjo@exercicioverso.com');

```

Registros iniciais de veículos pra teste
```
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