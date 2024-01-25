const express = require("express");
const ejs = require("ejs");
//const { read } = require("fs");
const app = express();
const  _readPlayers = require("./players.js");
const renderModule = require("./render");
const savePlayerModule = require("./save");
const loadPlayerModule = require("./load");

var myParser = require("body-parser");


app.listen(3001, () => {
  console.log("Application started and Listening on port 3001");
});

// serve your css as static
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(myParser.urlencoded({extended : false}));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/main.ejs");
});



app.get("/NEW", async (req, res) => {
  //read players
  var players = await _readPlayers();
  //add in the page
  var out = await renderModule.addPlayersinView(players, false);
  //reset cuurent position
  savePlayerModule.clearPosition();

  res.send(out);
  res.status(200)
})

app.get("/loadteam", async (req, res) => {
  //read players
  var players = await _readPlayers();
  console.log("/loadteam")
  res.send(players);
  res.status(200)
 // res.sendStatus(200);
})


app.get("/moveplayer", (req, res) => {

  savePlayerModule.savePlayerPosition(req.query)
  res.status(200)
  res.sendStatus(200);
})

app.get("/SAVE", (req, res) => {

  var fileName = req.query
  savePlayerModule.saveTeam(fileName);

  //res.send()
  res.status(200)
  res.sendStatus(200);
})

app.get("/LOAD", async (req, res) => {
  
  var fileName = req.query
 
  //read players
  var players = await _readPlayers();

  //reset current position & read team
  await loadPlayerModule.readPosition(fileName) 

  //add in the page
  var out = await renderModule.addPlayersinView(players, true);
 
  res.send(out);
  res.status(200)
})
