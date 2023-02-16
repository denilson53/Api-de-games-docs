# Api de Games
Esta API é utilizada para venda de games...

## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### ok! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJSb2xkRmVhckBnbWFpbC5jb20iLCJpYXQiOjE2NzY1ODc5ODAsImV4cCI6MTY3Njk0Nzk4MH0.8OnGfuHn-iFvYbKUgttXJbFvTf62C8YzIxp7Ok2oKKM"
}

```
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo da autenticação. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
{
    "err": "Token invalido !"
}
```

## Endpoints
### Post /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parametros
email: E-mail do usuário cadastrado no sistema.
password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo:

```
{
"email":"RoldFear@gmail.com",
"password":"12345678"
}
```

#### Respostas
##### ok! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games

Exemplo de resposta:
```
[
    {
        "id": 19,
        "title": "Sea of thieves",
        "year": "2020",
        "price": "89,99"
    },
    {
        "id": 20,
        "title": "Minecraft",
        "year": "2018",
        "price": "59,99"
    }
]

```
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo da autenticação. Motivos: Senha ou e-mail incorretos.

Exemplo de resposta:
{
    {err: "Credencias inválidas"}
}
