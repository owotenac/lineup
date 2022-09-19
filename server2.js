const express = require("express");
const { read } = require("fs");
const app = express();
const  _readPlayers = require("./players.js");
const addPlayersinView = require("./render")


app.listen(3001, () => {
  console.log("Application started and Listening on port 3000");
});

// serve your css as static
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

app.post('/READ', async (req, res)  => {
    //readP()
    var players = await _readPlayers();

    var out = addPlayersinView(players);

    res.send(out);

    res.status(200)
  });

