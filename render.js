const { Template } = require("ejs");
const e = require("express");
var fs = require("fs")
const savePlayerModule = require("./save")
const loadPlayerModule = require("./load")

const playerDiv = "<div class=\"player\" id=\"ID\" style=\"top: YYYpx; left: XXXpx; position: absolute; z-index: 9; text-align: center; border: 0px ;  \"> \
<img src=\"img/m.png\">\
<div id=\"dyn_divheader\">PLAYER_NAME</div>\
</div><players></players>"


const positionOnScreen = " { \"Gardien\" :{ \"y\":100, \"x\" :520 } , \"Defense\" :{ \"y\" :320, \"x\" :520 }, \"Milieu\" :{ \"y\" :530, \"x\" :520 }, \"Attaque\" :{ \"y\" :740, \"x\" :520 }}"
var positionObject;

function getY(position) {
    return positionObject[position].y;
}

function getX(position) {
    var _x = positionObject[position].x;
    positionObject[position].x = _x + 80
    return positionObject[position].x;
}

function getYFromTeam(player) {
    var team  = savePlayerModule.getTeam()

    for (let i=0; i < team.Position.length ; i++) {
        let o = team.Position[i]
        if (o.playerID == player.id) {
            return o.y
        }
    }
    return getY(player.Position);
}

function getXFromTeam(player) {
    var team  = savePlayerModule.getTeam()
    
    for (let i=0; i < team.Position.length ; i++) {
        let o = team.Position[i]
        if (o.playerID == player.id) {
            return o.x
        }
    }

    //not found
    return getX(player.Position);
}



function replace(content, player, i)
{

    var Y = getY(player.Position)
    var X = getX(player.Position) 

    content = content.replace("<players></players>",playerDiv)
    content = content.replace("PLAYER_NAME",player.Name)
    content = content.replace("XXX", X  )
    content = content.replace("YYY",Y )
    content = content.replace("ID",player.id)

    return content
}

function replaceWithTeam(content, player, i)
{

    var Y = getYFromTeam(player)
    var X = getXFromTeam(player) 

    content = content.replace("<players></players>",playerDiv)
    content = content.replace("PLAYER_NAME",player.Name)
    content = content.replace("XXX", X  )
    content = content.replace("YYY",Y )
    content = content.replace("ID",player.id)

    return content
}

async function addCompoList()
{

    var listCompo = await loadPlayerModule.listCompo();

    var loadDialog = fs.readFileSync(__dirname + "/views/loaddialog.ejs", 'utf-8') ;
    var divList = []
    for (let i in listCompo) {
        divList = divList + "<option value=" + listCompo[i] + ">" + listCompo[i] + "</option>"
    }
    loadDialog = loadDialog.replace("<file></file>", divList)

    return loadDialog
}

async function addPlayersinView(players, readFromTeam) {

    //reset position in view
    positionObject = JSON.parse(positionOnScreen)

    var fileTemplate = fs.readFileSync(__dirname + "/views/template.html", 'utf-8');

    if (!readFromTeam) {
        //defaut view
        for (let i in players.Players) {
            fileTemplate = replace(fileTemplate, players.Players[i], i);
        }
    }
    else {
        //defaut view
        for (let i in players.Players) {
            fileTemplate = replaceWithTeam(fileTemplate, players.Players[i], i);
        }
    }

    var fileHeader = fs.readFileSync(__dirname + "/views/header.ejs", 'utf-8');
    var saveDialog = fs.readFileSync(__dirname + "/views/savedialog.ejs", 'utf-8');
    var loadDialog =  await addCompoList();
    var fileContent = fs.readFileSync(__dirname + "/views/content.ejs", 'utf-8');
    var fileFooter = fs.readFileSync(__dirname + "/views/footer.ejs", 'utf-8');

    var outHTML = fileHeader + saveDialog + loadDialog + fileContent + fileTemplate + fileFooter;
    
    return outHTML;
}


module.exports = {
    addPlayersinView: addPlayersinView,
}