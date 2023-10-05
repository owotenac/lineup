const utils  = require("./utils")
const savePlayerModule = require("./save")
var fs = require("fs")
//const readdir = require('node:fs/promises')
//import { readdir } from 'node:fs/promises';

async function _readTeam(file) {
    return new Promise(resolve => {
        var fileName = file.fileName;
        utils.jsonReader("./saved/" + fileName , (err, playerPosition) => {
            if (err) {
                console.log(err)
                resolve("ERROR")
            }
            resolve(playerPosition)
        })
    })
}

async function readPosition(fileName) {
    //clear pos
    savePlayerModule.clearPosition();
    //read team
    var readTeam = await _readTeam(fileName);
    //set the team
    savePlayerModule.setTeam(readTeam);
}


async function listCompo()
{
        //get all the compo
        var compoList = []
        try {
            const files = await readdir.readdir("./saved");
            for (const file of files)
                compoList.push(file)
        } catch (err) {
            console.error(err);
        }

        return compoList
}

module.exports = { 
    readPosition : readPosition,
    listCompo : listCompo
}
