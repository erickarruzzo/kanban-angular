# Kanban em Angular - Desenvolvido por Erick Arruzzo

![GitHub CI](https://github.com/svierk/angular-bootstrap-toast-service/actions/workflows/ci.yaml/badge.svg)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?logo=reactivex&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?logo=bootstrap&logoColor=white)
![Angular Material](https://img.shields.io/badge/material-%23563D7C.svg?logo=material&logoColor=white)

## About the project

Projeto realizado para o processo seletivo da ADA Tech.

## Getting started

Para poder rodar o projeto localmente, execute o seguinte comando: 

- `npm install` para instalar todas as dependências do projeto.

## Development Server

Depois de instalar todas as dependências, já estará apto para rodar o projeto com o seguinte comando:

- `ng serve` para executar o servidor local. Após executar o comando, use o navegado para abrir o programa no endereço: `http://localhost:4200/`.

## Run with Docker

- `docker build -t angular-docker .` para executar o docker e criar uma imagem do programa

## Docker - Run Image

- `docker run -p 4201:4200 angular-docker` para executar a imagem

## Docker - Browser

Depois desses passos, já pode abrir no browser a aplicação na URL: http://localhost:4201/

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
