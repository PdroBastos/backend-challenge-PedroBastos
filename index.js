const express = require("express");
const app = express();
const Axios = require("axios");
const fs = require("fs");
const Path = require("path");

const randomString = require('randomstring');

require("dotenv").config();
const API_Key = process.env.API_Key;

const jwt = require("jsonwebtoken");

// Models
const { Users } = require("./models");
const { Posts } = require("./models");
const { Audios } = require("./models");
const { redirect } = require("express/lib/response");
const { url } = require("inspector");
// const { path } = require("express/lib/application");

app.use(express.json());

// Auth
app.post("/auth", async (req, res) => {
  try {
    //body
    const email = req.body.email;
    const psw = req.body.psw;
    const userAuth = await Users.findOne({
      where: {
        email,
        psw,
      },
    });

    if (userAuth) {
      const token = await jwt.sign({ email }, "123");
      res.status(200).send(token);
      return;
    } else {
      throw new Error("Negado");
    }
  } catch (err) {
    console.log("error", err);
  }
});

// User functions //
app.post("/user/", async (req, res) => {
  try {
    // Body
    const name = req.body.name;
    const email = req.body.email;
    const psw = req.body.psw;
    const isadmin = req.body.isadmin;

    const userCreate = await Users.create({
      name,
      email,
      psw,
      isadmin,
    });

    res.status(201).send(userCreate);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("deu merda");
  }
});

app.get("/users/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decrypt = await jwt.verify(token, "123");
    const userAuth = await Users.findOne({
      where: { email: decrypt.email, isadmin: true },
    });

    if (userAuth) {
      const users = await Users.findAll();
      res.send(users);
    } else {
      res.status(403).send();
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/user/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decrypt = await jwt.verify(token, "123");
    const userAuth = await Users.findOne({
      where: { email: decrypt.email },
    });
    if (userAuth) {
      const id = userAuth.id;
      const name = req.body.name;
      const email = req.body.email;
      const psw = req.body.psw;

      const userUpdate = await Users.update(
        { name, email, psw },
        { where: { id } }
      );
      res.send(userUpdate);
    } else {
      res.status(204).send("Change was not made");
    }
  } catch (error) {
    console.log("error", error);
    res.status(204).send("change was not made");
  }
});

// Text functions //
app.post("/text/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decrypt = await jwt.verify(token, "123");
    const userAuth = await Users.findOne({
      where: { email: decrypt.email },
    });
    if (userAuth) {
      const userId = userAuth.id;
      const title = req.body.title;
      const subtitle = req.body.subtitle;
      const textBody = req.body.textBody;

      const text = await Posts.create({
        title,
        subtitle,
        text: textBody,
        userId,
      });
      res.send(text);
    } else {
      res.status(403).send();
    }
  } catch (error) {
    console.log("error", error);
    res.status(404).send("Deu Ruim");
  }
});

app.put("/text/", async (req, res) => {
  //rever as rotas e autenticações//
  try {
    const token = req.headers.authorization;
    const decrypt = await jwt.verify(token, "123");
    const userAuth = await Users.findOne({
      where: { email: decrypt.email },
    });
    if (userAuth) {
      const userId = userAuth.id;
      const posts = await Posts.findOne({ where: { userId } });
      const id = req.body.id;

      const title = req.body.title;
      const subtitle = req.body.subtitle;
      const text = req.body.text;
      const newText = await Posts.update(
        { title, subtitle, text: text },
        { where: { id } },
        { where: { userId } }
      );
      res.status(201).send(newText);
    } else {
      res.status(403).send();
    }
  } catch (error) {
    console.log("error", error);
    res.status(204).send("change was not made");
  }
});

app.get("/text/:id/", async (req, res) => {
  try {
    // Params
    const id = req.params.id;

    const posts = await Posts.findOne({ where: { id } });

    res.send(posts);
  } catch (error) {
    console.log("error", error);
    res.status(204).send("No Content");
  }
});

app.get("/user/texts", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decrypt = await jwt.verify(token, "123");
    const userAuth = await Users.findOne({
      where: { email: decrypt.email },
    });
    if (userAuth) {
      const userId = userAuth.id;
      const posts = await Posts.findAll({ where: { userId } });
      res.send(posts);
    } else {
      res.status(403).send();
    }
  } catch (error) {
    console.log("error", error);
    res.status(204).send("No Content");
  }
});

app.delete("/text/:id/", async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Posts.destroy({
      where: { id },
    });

    res.sendStatus(200);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Não deletado");
  }
});

// audio method

app.post("/text/:id/audio", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decrypt = await jwt.verify(token, "123");
    const userAuth = await Users.findOne({
      where: { email: decrypt.email },
    });
    if (userAuth) {
      const userId = userAuth.id;

    const postId = req.params.id;
    const textCreated = await Posts.findOne({
      where: {
        id: postId,
      }
    });

    if (!textCreated) return res.send("text not found");
    else {
      const nameFile = `${randomString.generate(7)}.wma`;

      const response = await Axios.get(
        `https://api.voicerss.org/?key=${API_Key}&hl=pt-br&c=MP3&src=${textCreated.text}`
      );
      console.log(response);

      async function download() {
        const url = `https://api.voicerss.org/?key=${API_Key}&hl=pt-br&c=MP3&src=${textCreated.text}`;
        const path = Path.resolve(__dirname, "files", nameFile);

        const response = await Axios({
          method: "GET",
          url: url,
          responseType: "stream",
        });

        response.data.pipe(fs.createWriteStream(path));

        return new Promise((resolve, reject) => {
          response.data.on("end", () => {
            res.status(200).send('OK');
            resolve();
          });

          response.data.on("error", (err) => {
            res.status(500);
            reject(err);
          });
        });
      }

      await download();

      const audioList = await Audios.create({
        nameFile,
        userId,
        postId
      });

      // Salvar no seu banco de dados o nome do arquivo
      // URL => nameFile
    }
  }
} catch (error) {
  console.log(error)
  res.status(404).send("Not Found");
}
});

app.get("/text/:id/audio", async (req, res) => {
  try {
    const postId = req.params.id;
    const textAudio = await Audios.findOne({
      where: {
        id: postId,
        nameFile,
      }
    });

    // FINDONE NA TABELA AUDIO -> WHERE POSTID
    // Path.resolve(__dirname, "files", audio->nameFile)

    fs.readFile(
      Path.resolve(__dirname, "files", 'qsRpCvm.wma'),
      (err, data) => {
        if (err) {
          console.error(err);
        }

        // Set audio
        res.header('Content-Type', 'audio/mpeg');
        res.header('Content-Length', data.length);
        res.send(data);
      }
    );
  } catch (error) {
    res.status(500).send("Deu erro" + error);
  }
});

app.put("/text/:id/audio", async (req, res) => {
  try {
  } catch {}
});

if (process.env.NODE_ENV !== "test") {
  app.listen(2000, () => {
    console.log("meu servidor esta rodando");
  });
}

module.exports = app;
