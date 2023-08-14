const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const userRouts = require('./routes/userRouter');
const gameRouts = require('./routes/gameRouter');
const notFoundHandler = require('./middleware/404');
const dbURI = "mongodb+srv://majdishomali1997:uVxsL6cXyv6CIZv8@cluster0.pacgw6a.mongodb.net/Playtopia"
const errorHandler = require('./middleware/500')
const Protected = require('./middleware/Protected')
const addPost = require('./routes/postRoutes/addPost')
const postRoutes = require('./routes/postRoutes/Post')
const addComment = require('./routes/postRoutes/Comment')

const app = express();
app.use(cors());

const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome");
});


app.use(userRouts);
app.use(gameRouts);
app.use(addPost)
app.use(postRoutes)
app.use(addComment)
app.use('*',notFoundHandler);
app.use(errorHandler);
app.use(Protected)



module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });
      });
  },
};