CREATE DATABASE primeira_api;

USE primeira_api;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM produtos;


INSERT INTO produtos (nome, preco, descricao)
VALUES ('Teclado mecânico', 250.00, 'Teclado com switches azuis');

INSERT INTO produtos (nome, preco, descricao)
VALUES ('TESTE', 250.00, 'Teclado com switches azuis');

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT
);