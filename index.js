const express = require('express');

// const sequelize = new Sequelize('postgres', 'postgres', '123', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

const app = express();


const db = require('./db');

const { Users } = require('./models');
const { Posts } = require('./models');
const { Audios} = require('./models');

// console.log('Users =>>>', Users);
// console.log('Posts =>>>', Posts);
// console.log('Audios =>>>', Audios);

app.use(express.json());


//Funções de Usuário.

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
    const usersName = req.body
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
      const idUser = req.params.id;
      const { newUser } = req.body;
      const { newEmail } = req.body;
      const { newPsw } = req.body;
      const user = await Users.update({user:newUser},{where:idUser});
      const email = await Users.update({email:newEmail},{where:idUser});
      const psw = await Users.update({email:newPsw},{where:idUser});

    
    res.status(201).send(user);
    res.status(201).send(email);
    res.status(201).send(psw);

  } catch (error) {
    console.log('error', error);
    res.status(204).send('Alteração não foi feita');
  }
});
  

//Funções de texto.

  app.post('/text/', async (req, res) => {
    try {
      const textBody = req.body;
      // const userId = req.params.id
      const text = await Posts.create({
        title: textBody.title,
        subtitle: textBody.subtitle,
        text: textBody.text,
        // id: userId
        
      });

      res.status(201).send(text);

  } catch (error) {
    console.log('error', error);
      res.status(404).send('Deu Ruim');
  }
});


  app.put("/text/:id", async (req, res) => {
    try {
      const idText = req.params.id;
      const { newText } = req.body;
      const text = await Posts.update({text:newText},{where:idText});

      
      res.status(201).send(text);

    } catch (error) {
      console.log('error', error);
      res.status(204).send('No Content');
    }
  });


// app.get('/text/:id', async (req, res) => {
//   try {
//     const idText = req.params
//     const text = await Posts.findOne({ where: { id: idText } });
    
//     res.status(201).send(text);

//   } catch (error) {
//     console.log('error', error);
//     res.status(204).send('No Content');
//   }
// });

app.get('/user/:id/text', async (req, res) => {
try {
  const idDoUsuario = req.params;;
  const text = await Posts.findOne({ where: { id: idDoUsuario } });
  
  res.send(text);

} catch (error) {
  console.log('error', error);
  res.status(204).send('No Content');
}
});


app.delete('/text/:id/', async (req, res) => {
  try{
    const idText = req.params;
    const text = await Posts.findOne({ where: { id: idText } });

    res.status(204).send(text);

  } catch (error) {
    console.log('error', error);
    res.status(500).send('Internal Server Error');
  }
});

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