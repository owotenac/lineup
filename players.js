const fs = require('fs')

function jsonReader(filePath, cb) {
    //const fs = require('fs')
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}


module.exports = async function _readPlayers() {
    return new Promise(resolve => {

        jsonReader('./team/team.json', (err, player) => {
            if (err) {
                console.log(err)
                resolve("ERROR")
            }
            resolve(player)
        })
    })
}

