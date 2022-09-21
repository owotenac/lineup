const express = require("express");
const ejs = require("ejs");
const { read } = require("fs");
const app = express();
const  _readPlayers = require("./players.js");
const addPlayersinView = require("./render")


app.listen(3001, () => {
  console.log("Application started and Listening on port 3000");
});

// serve your css as static
app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/main.ejs");
});

app.post('/READ', async (req, res)  => {
    //readP()
    var players = await _readPlayers();

    var out = addPlayersinView(players);

    res.send(out);

    res.status(200)
  });

