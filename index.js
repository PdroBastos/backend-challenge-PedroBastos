const express = require('express');

const app = express();

const db = require('./db');

const { Users } = require('./models');
const { Posts } = require('./models');
const { Audios} = require('./models');

const { uuid } = require('uuidv4');
const { text } = require('express');
const res = require('express/lib/response');
const req = require('express/lib/request');

app.use(express.json());


app.get('/user/:id', async (req, res) => {
  const idDoUsuario = req.params.id;
  const user = await Users.findOne({ where: { id: uuid } });
  res.send(user);
});


app.post('/user', async (req, res) => {
  try {
      const userBody = req.body;
      const user = await Users.create({
        name: userBody.name,
        email: userBody.email,
        psw: userBody.psw,
      });

      res.status(201).send(user);
  } catch (error) {
    console.log('error', error);
      res.status(500).send('deu merda');
  }
});


app.get('/users', async (req, res) => {
  try {
    const userName = req.body

  } catch (error) {
    console.log('error', error);
      res.status(500).send('Internal Server Error');
  }
});
  
  
  // limit = req.query.limit;
  // username = req.query.username
  // const conexao = await db.connect();
  // let users;
  // if(username) users =  await conexao.query(`SELECT id, username FROM users WHERE username = '${username}'`);
  // else if(limit) users = await conexao.query(`SELECT id, username FROM users LIMIT ${limit}`);
  // else users = await conexao.query('SELECT id, username FROM users');
  // res.send(users.rows);


  app.put("/text/:id", async (req, res) => {
    try {
      const idText = req.params.id
      const Posts = await Posts.findOne({ where: { id: uuid} });
      
      res.status(201).send(Posts);

    } catch (error) {
      console.log('error', error);
      res.status(204).send('No Content');
    }
  });


  app.post("/text", async (req, res) => {
    try {
      const textBody = req.body;
      const text = await Posts.create({
        title: textBody.title,
        subtitle: textBody.subtitle,
        text: textBody.text,
      });

      res.status(201).send(text);

  } catch (error) {
    console.log('error', error);
      res.status(404).send('Not Found');
  }
});


app.get('/text/:id', async (req, res) => {
  try {
    const idText = req.params.uuid
    const Posts = await Posts.findOne({ where: { id: idText } });
    
    res.status(201).send(Posts);

  } catch (error) {
    console.log('error', error);
    res.status(204).send('No Content');
  }
});

app.get('/user/:id/text', async (req, res) => {
  const idDoUsuario = req.params.uuid;
  const user = await Users.findOne({ where: { id: idDoUsuario } });
  const idText = req.params.uuid
  const Posts = await Posts.findOne({ where: { id: idText } });
  res.send(Posts);
});


app.delete('/text/:id/', async (req, res) => {
  try{
    const idText = req.params.uuid
    const Posts = await Posts.findOne({ where: { id: idText } });

    res.status(204).send(Posts);

  } catch (error) {
    console.log('error', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/text/:id/audio", async (req, res) => {
    try {
      const textAudio = req.body;
      const audio = await Audios.create({
        URL: textAudio.URL,        
      
      });


      res.status(201).send(audio);

  } catch (error) {
    console.log('error', error);
      res.status(404).send('Not Found');
  }
});


app.get('/text/:id.audio', async (req, res) => {
  try {
    const textAudio = req.params.uuid
    const Audios = await Audios.findOne({ where: { id: textAudio } });
    
    res.status(201).send(Audios);

  } catch (error) {
    console.log('error', error);
    res.status(204).send('No Content');
  }
});


app.put('/text/:id.audio', async (req, res) => {
  try {
    const textAudio = req.params.uuid
    const Audios = await Audios.findOne({ where: { id: textAudio } });
    
    res.status(201).send(Audios);

  } catch (error) {
    console.log('error', error);
    res.status(204).send('No Content');
  }
});





app.listen(3000, () => {
    console.log("Meu Servidor está rodando");
  })