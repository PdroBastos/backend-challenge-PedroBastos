# backend_challenge_Pedro_Bastos
  
Essa API é o resultado de todo o meu conhcimento adquirido ao longo do curso, Do Zero ao Júnior, ministrado pela PingBack.


# ROTAS USUÁRIOS

```POST - /user```
```POST - /auth``` (A autenticação é passada no Headers como 'Authorization' e o 'Value' é o token gerado pela rota de autenticação.)
```GET - /users``` (Buscar todos os usuários, somente administradores tem autorização.)
```PUT - /user/:id```

# ROTAS TEXTO

```POST - /text```
```PUT - /text/:id```
```GET - /text/:id ```
```GET - /user/:id/texts```
```DEL - /text/:id```

# ROTAS AUDIO

```POST - /text/:id/audio```
```GET - /text/:id/audio```
```PUT - /text/:id/audio```
