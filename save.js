const fs = require('fs');

var tempPosition;
clearPosition(); 


function savePlayerPosition(player) {

    //check if I exists
    for (let i=0; i < tempPosition.Position.length; i++) {
        var o = tempPosition.Position[i]
        if (o.playerID === player.playerID) {
            o.x = player.x;
            o.y = player.y;
            return
        }
    }

    tempPosition.Position.push(player)
}

function clearPosition() {
    tempPosition = {
        Position: []
    }
}

function saveTeam(file) {
    const data = JSON.stringify(tempPosition);
    var fileName = file.fileName;
    // write JSON string to a file
    fs.writeFile("./saved/" + fileName , data, (err) => {
        if (err) {
            throw err;
        }
});
}

function setTeam(team) {
    tempPosition = team
}

function getTeam(){
    return tempPosition
}

module.exports = { 
    clearPosition : clearPosition,
    savePlayerPosition : savePlayerPosition,
    saveTeam : saveTeam,
    setTeam : setTeam,
    getTeam : getTeam
}