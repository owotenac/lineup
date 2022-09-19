var fs = require("fs")

const playerDiv = "<div class=\"player\" id=\"dyn_div_ID\" style=\"top: 80px; left: TOP_VALUEpx; position: absolute; z-index: 9; text-align: center; border: 0px ;  \"> \
<img src=\"img/m.png\">\
<div id=\"dyn_divheader\">PLAYER_NAME</div>\
</div><players></players>"

function replace(content, playerName, i)
{
    content = content.replace("<players></players>",playerDiv)
    content = content.replace("PLAYER_NAME",playerName)
    content = content.replace("TOP_VALUE",(i*80)+20 )
    content = content.replace("ID",i)

    return content
}

function addPlayersinView(players) {
    var fileTemplate = fs.readFileSync(__dirname + "/views/template.html", 'utf-8');


    for (let i in players.Players) {
        fileTemplate = replace(fileTemplate, players.Players[i].Name, i);
    }



    return fileTemplate;
}

module.exports = addPlayersinView;