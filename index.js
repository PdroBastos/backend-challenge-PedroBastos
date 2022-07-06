const express = require("express");
const app = express();
// Models
const { Users } = require("./models");
const { Posts } = require("./models");
const { Audios } = require("./models");

const session = require("express-session");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
require("./config/auth")(passport);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Auth
app.use(
  session({
    secret: "PassportLogin",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 60 * 1000 },
  })
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const login = function (req, res, next) {
  res.locals.Users = req.Users || null;
  console.log("LOGGED");
  next();
};

app.use(login);

function userAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.id == req.params.id) {
      return next();
    } else {
      return res
        .status(401)
        .json({ msg: "You need to login with username and password" });
    }
  } else {
    return res.json({ msg: "Access denied! The user must be logged in" });
  }
}

function adminAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json({
        msg: "Access denied! You need to be an administrator to access",
      });
    }
  } else {
    return res.json({ msg: "The user must be logged in" });
  }
}

app.get("/success", async (req, res) => {
  res.status(200).send("User logged in successfully");
});

app.get("/failure", async (req, res) => {
  res.status(403).send("invalid credentials");
});

app.post("/auth", async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })(req, res, next);
});

// User functions //
app.post("/user", async (req, res) => {
  try {
    // Body
    const userDataBody = req.body;
    const userCreate = await Users.create({
      name: userDataBody.name,
      email: userDataBody.email,
      psw: userDataBody.psw,
      isAdmin: userDataBody.isAdmin,
    });

    res.status(201).send(userCreate);
  } catch (error) {
    res.status(500).send("Not created" + error);
  }
});

app.get("/users", adminAuthentication, async (req, res) => {
  try {
    const user = await Users.findAll();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Not found" + error);
  }
});

app.put("/user/:id", userAuthentication, async (req, res) => {
  try {
    const id = req.params.id;
    const userDataBody = req.body;
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(400).send("User not found");
    } else {
      user.name = userDataBody.name;
      user.email = userDataBody.email;
      user.psw = userDataBody.psw;

      await user.save();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Not found " + error);
  }
});

// Text functions //
app.post("/text", async (req, res) => {
  try {
    const textDataBody = req.body;
    const post = await Posts.create({
      title: textDataBody.title,
      subtitle: textDataBody.subtitle,
      text: textDataBody.text,
      userId: textDataBody.userId,
    });
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send("Not found " + error);
  }
});

app.put("/text/:id", async (req, res) => {
  try {
    const idText = req.params.id;
    const textDataBody = req.body;

    const posts = await Posts.update(
      {
        title: textDataBody.title,
        subtitle: textDataBody.subtitle,
        text: textDataBody.text,
      },
      {
        where: {
          id: idText,
        },
      }
    );

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send("Not found" + error);
  }
});

app.get("/text/:id", async (req, res) => {
  try {
    const idText = req.params.id;

    const post = await Posts.findOne({
      where: {
        id: idText,
      },
    });

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send("Not found" + error);
  }
});

app.get("/user/:id/texts", async (req, res) => {
  try {
    const idText = req.params.id;

    const post = await Posts.findAll({
      where: {
        userId: idText,
      },
    });

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send("Not found" + error);
  }
});

app.delete("/text/:id", async (req, res) => {
  try {
    const idText = req.params.id;

    const post = await Posts.destroy({
      where: {
        id: idText,
      },
    });

    res.status(200).send("Text deleted");
  } catch (error) {
    res.status(500).send("Not found " + error);
  }
});

// audio method

app.post("/text/:id/audio", async (req, res) => {
  try {
    const idText = req.params.id;
    const text = await Posts.findOne({
      where: {
        id: idText,
      },
    });

    const url = await cloudinary.uploader.upload(
      `http://api.voicerss.org/?key=${process.env.RSS_KEY}&hl=pt-br&src=${text.text}`,
      { resource_type: "video" },
      function (error, result) {
        console.log(result, error);
      }
    );

    const audios = await Audios.create({
      url: url.url,
      postId: idText,
      userId: text.userId,
    });

    res.status(201).send(audios);
  } catch (error) {
    res.status(500).send("Deu errado " + error);
  }
});

app.get("/text/:id/audio/", async (req, res) => {
  try {
    const postId = req.params.id;
    let audio;

    if ((audio = await Audios.findOne({ where: { postId: postId } }))) {
      res.status(200).redirect(audio.url);
    } else {
      const text = await Posts.findOne({
        where: {
          id: postId,
        },
      });

      const url = await cloudinary.uploader.upload(
        `http://api.voicerss.org/?key=${process.env.RSS_KEY}&hl=pt-br&src=${text.text}`,
        { resource_type: "video" },
        function (error, result) {
          console.log(result, error);
        }
      );

      const audioCreate = await Audios.create({
        url: url.url,
        postId: postId,
        userId: text.userId,
      });

      res.status(201).redirect(audioCreate.url);
    }
  } catch (error) {
    res.status(500).send("Deu errado " + error);
  }
});

app.put("/text/:id/audio/", async (req, res) => {
  try {
    const postId = req.params.id;
    const text = await Posts.findOne({
      where: {
        id: postId,
      },
    });

    const url = await cloudinary.uploader.upload(
      `http://api.voicerss.org/?key=${process.env.RSS_KEY}&hl=pt-br&src=${text.text}`,
      { resource_type: "video" },
      function (error, result) {
        console.log(result, error);
      }
    );

    const audio = await Audios.update(
      {
        url: url.url,
      },
      {
        where: {
          postId: postId,
        },
      }
    );

    res.status(200).send(audio);
  } catch (error) {
    res.status(500).send("Deu errado " + error);
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(2000, () => {
    console.log("The server is online");
  });
}

module.exports = app;
