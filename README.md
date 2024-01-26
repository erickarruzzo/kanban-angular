# Kanban em Angular - Desenvolvido por Erick Arruzzo

![GitHub CI](https://github.com/svierk/angular-bootstrap-toast-service/actions/workflows/ci.yaml/badge.svg)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?logo=reactivex&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?logo=bootstrap&logoColor=white)
![Angular Material](https://img.shields.io/badge/material-%23563D7C.svg?logo=material&logoColor=white)

## About the project

Projeto realizado para solução de um desafio da ADA Tech.
O sistema foi desenvolvido em typescript utilizando o framework Angular em sua versão 17 (a mais recente na data de desenvolvimento). 
Foram utilizadas diversas biliotecas e as que mais se destacam são: 
- Bootstrap e Angular Material: Biblioteca usada para a construção do layout, formulário e seus componentes
- Rxjs: Biblioteca usada para realização de chamadas assíncronas com o backend
- Jasmine: Biblioteca usada para construção e execução dos testes unitários

## Getting started

Para poder rodar o projeto localmente, execute o seguinte comando: 

- `npm install` para instalar todas as dependências do projeto.

## Development Server

Depois de instalar todas as dependências, já estará apto para rodar o projeto com o seguinte comando:

- `ng serve` para executar o servidor local. Após executar o comando, use o navegado para abrir o programa no endereço: `http://localhost:4200/`.

## Run Tests

Para executar os testes primários:

- `ng test`.

## Run with Docker

- `docker build -t node-docker .\backend\` para executar o docker e criar uma imagem do programa do backend

- `docker build -t angular-docker .\frontend\` para executar o docker e criar uma imagem do programa do frontend

## Docker - Run Image

- `docker run -p 5000:5000 node-docker` para executar a imagem do back

- `docker run -p 4200:4200 angular-docker` para executar a imagem do front

## Docker - Browser

Depois desses passos, já pode abrir no browser a aplicação na URL: http://localhost:4200/

## CORS

Foi necessário aplicar uma alteração no código do back para o CORS.

```
const corsOptions = {
  origin: ['http://localhost:4200','http://localhost:4201'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
```

Apenas esse ponto foi alterado para poder realizar as requisições tanto com a aplicação dockerizada como no server local

## Novas Funcionalidades

- Drag and Drop do card para as colunas
- Dialog para criação de um novo card
- Avisos de erro, info ou sucesso na tela
