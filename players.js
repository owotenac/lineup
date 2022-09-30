const utils  = require("./utils")


module.exports = async function _readPlayers() {
    return new Promise(resolve => {

        utils.jsonReader('./team/team.json', (err, player) => {
            if (err) {
                console.log(err)
                resolve("ERROR")
            }
            resolve(player)
        })
    })
}


