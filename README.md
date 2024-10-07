# dashboardCarros
Um dashboard simples full JS e postgres para uma locadora de carros


## BD PostgreSQL
Aqui está o script SQL para criar a tabela de carros no PostgreSQL:

```
Copiar código
CREATE TABLE carros (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    km INTEGER NOT NULL CHECK (km >= 0),
    placa VARCHAR(10) UNIQUE NOT NULL,
    situacao VARCHAR(20) NOT NULL CHECK (situacao IN ('uso', 'alugado', 'manutencao'))
);
```

Detalhes dos campos:
id: Identificador único, gerado automaticamente.
modelo: Nome do modelo do carro.
cor: Cor do carro.
km: Quilometragem do carro, garantindo que seja um valor positivo.
placa: Placa do carro, garantindo que seja única.
situacao: Situação do carro, permitindo apenas os valores uso, alugado, ou manutencao.

