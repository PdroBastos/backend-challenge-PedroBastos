const { response } = require('express');
const express = require('express');
const app = express();
const db = require('./db');
const {v4 : uuidv4} = require('uuid');



const { Users } = require('./models');
const { Posts } = require('./models');
const { Audios} = require('./models');
const posts = require('./models/posts');



app.use(express.json());


// Funções de Usuário. //

app.post('/user/', async (req, res) => {
  try {
      const userBody = req.body;
      const user = await Users.create({
        name: userBody.name,
        email: userBody.email,
        psw: userBody.psw,
        isadmin: userBody.isadmin,
      });

      res.status(201).send(user);
  } catch (error) {
    console.log('error', error);
      res.status(500).send('deu merda');
  }
});


app.get('/users/', async (req, res) => {
  try {

    const users = await Users.findAll({
      where: {
        isadmin: true
      }
    })

    res.send(users);

  } catch (error) {
    console.log('error', error);
      res.status(500).send('Internal Server Error');
  }
});


app.put('/user/:id/', async (req, res) => {
  try {
      const name = req.body.name;
      const email = req.body.email;
      const psw = req.body.psw;
      const id  = req.params.id;

      const user = await Users.update({ name, email, psw }, { where: { id }});
    
    res.status(201).send(user);

  } catch (error) {
    console.log('error', error);
    res.status(204).send('Alteração não foi feita');
  }
});
  

//Funções de texto.

  app.post('/text/', async (req, res) => {
    try {
      const textBody = req.body;
      const userId = req.body.userId;
    
      const text = await Posts.create({
        title: textBody.title,
        subtitle: textBody.subtitle,
        text: textBody.text,
        userId: userId
      });

      res.status(201).send(text);

  } catch (error) {
    console.log('error', error);
      res.status(404).send('Deu Ruim');
  }
});


  app.put("/text/:id", async (req, res) => {
    try {
      const title = req.body.title;
      const subtitle = req.body.subtitle;
      const newText = req.body.newText;
      const id = req.params.id;

      const text = await Posts.update({ title, subtitle, text: newText, },{ where: { id }});

      const textIndex = text.findIndex(Posts => text.id == id);
      Posts[textIndex] = text;


      
      res.status(201).send(text);

    } catch (error) {
      console.log('error', error);
      res.status(204).send('Alteração não foi feita');
    }
  });
  

  app.get('text/:id/' , async (req, res) => {
    try {
      const id = req.params.id;


      res.send(text);
    
    } catch (error) {
      console.log('error', error);
      res.status(204).send('No Content');
    }
  });


app.get('/user/:id/texts', async (req, res) => {
try {



 
  res.send(user);

} catch (error) {
  console.log('error', error);
  res.status(204).send('No Content');
}
});


app.delete('/text/:id/', async (req, res) => {
  try{

    const deleteText = Posts.deleteOne({id: req.params.id });

    res.status(204).send(deleteText);

  } catch (error) {
    console.log('error', error);
    res.status(500).send('Não deletado');
  }
});


// Audios Functions


app.post('/text/:id/audio', async (req, res) => {
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
    const textAudio = req.params;
    const audio = await Audios.findOne({ where: { id: textAudio } });
    
    res.status(201).send(audio);

  } catch (error) {
    console.log('error', error);
    res.status(204).send('No Content');
  }
});


app.put('/text/:id.audio', async (req, res) => {
  try {
    const textAudio = req.params;
    const audio = await Audios.findOne({ where: { id: textAudio } });
    
    res.status(201).send(audio);

  } catch (error) {
    console.log('error', error);
    res.status(204).send('No Content');
  }
});


if (process.env.NODE_ENV !== 'test' ) {
  app.listen(2000, () => {
      console.log("meu servidor esta rodando");
  })
}


module.exports = app;