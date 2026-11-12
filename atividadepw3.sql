CREATE DATABASE IF NOT EXISTS dev_db
	DEFAULT CHARACTER SET utf8mb4
	DEFAULT COLLATE utf8mb4_unicode_ci;

USE dev_db;

CREATE TABLE IF NOT EXISTS usuarios (
	id INT NOT NULL auto_increment,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    primary key(id)
);

insert into usuarios (nome,email) values
	('nome 1', 'nome1@dominio.com'),
    ('nome 2', 'nome2@dominio.com'),
    ('nome 3', 'nome3@dominio.com'),
    ('nome 4', 'nome4@dominio.com');

SELECT * FROM usuarios;