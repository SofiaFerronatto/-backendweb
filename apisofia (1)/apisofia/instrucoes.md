# Anotações de Backend
Vinícius Bortoloti

### Pra que serve uma API?
- Criar dados
- Listar dados
- Buscar dados
- Atualizar e remover dados

### Pré-requisitos
- node.js instalado
- npm
- mysql server
- cliente para teste (Thunder Client) (Postman ou Insomnia)

## Iniciar o projeto
Executar no terminal
```
npm init -y
```

Criar pasta src

Colocar em baixo do teste no arquivo package
```
"start": "node src/server.js"
```

```
npm install express mysql2 dotenv
```

Biblioteca nova que ajuda a atualizar automaticamente o servidor
```
npm install nodemon
```

Colocar no package em baixo do start
```
"dev": "nodemon src/server.js"
```

Criar arquivos
```
.env
.gitignore
```