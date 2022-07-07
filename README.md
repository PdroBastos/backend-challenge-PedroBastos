 # backend_challenge_Pedro_Bastos
  
Esse é o resultado de todo o meu conhcimento adquirido ao longo do curso, Do Zero ao Júnior, ministrado pela PingBack.

# Iniciando 

O primeiro comando a ser iniciado no terminal é o `npm install`, para instalar todas as depêndencias para esse projeto. 
O segundo passo é abrir o arquivo `config.json` e configurar o banco de Dados que será ultilizado, para que tudo funcione corretamente.
Por ultimo você deve renomear o arquivo `.env.example` para `.env` e defina as variáveis do Voice RSS e Cloudinary.

# Executando as rotas

A seguir temos as rotas de acordo com cada propósito.

# ROTAS USUÁRIOS

`POST - /user` - Criar um usuário.
`POST - /auth` - Autenticação do usuário(necessário para que as outras rotas que necessita de autenticação funcione, (tempo de loggin 2 minutos) No body,ultilizando o "email" e "senha" já cadastrado no banco de Dados.
`GET - /users` - Buscar todos os usuários, somente administradores tem autorização.
`PUT - /user/:id` - Editar usuário, apenas o próprio usuário usa esta rota. Para que essa rota funcione, é necessário fazer login com o próprio usuário na rota de autenticação.

# ROTAS TEXTO

`POST - /text` - Criar um objeto de texto.
`PUT - /text/:id` - Editar um objeto de texto. Passe nos parâmetros o id do objeto de texto.
`GET - /text/:id ` - Obter objeto de texto. Passe nos parâmetros o id do objeto de texto.
`GET - /user/:id/texts` - Obter todos os objetos de texto de um determinado usuário. Passe nos parâmetros o id do usuário que deseja obter os textos.
`DEL - /text/:id` - Excluir objeto de texto. Passe nos parâmetros o id do objeto de texto.

# ROTAS AUDIO

`POST - /text/:id/audio` - Solicitar TTS. Passe nos parâmetros o id do texto que deseja converter em áudio.
`GET - /text/:id/audio` - Obtenha o arquivo de áudio se já estiver convertido, caso contrário, deve executar o método POST. Passe nos parâmetros o id do texto que deseja obter o áudio.
`PUT - /text/:id/audio` - Forçar nova conversão TTS. Passe nos parâmetros o id do texto que deseja atualizar o áudio.


# ROTA DE TESTE

Para executar os testes das rotas de forma automática utilize o comando `npm run test` no terminal.


# AGRADECIMENTOS

Aproveito esse momento em que estou concluindo o primeiro de muitos projetos como desenvolvedor Backend, para agradecer imensamente a todos da Pingback por todo o conhecimento passado, por acreditar em mim e ter proporcionado a chance de uma nova jornada/carreira.

Esse Teste foi um grande desafio que me fez aprender muito mais e amar cada vez mais a programação, estou muito feliz por ter conseguido concluir e ver tudo funcionando corretamente.

Meu muito obrigado a todos da Pingback, Matt, Gabriel, Daniel, Douglas, Pedrinho, Thiago e todos os outros!!
