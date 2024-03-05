//import path
const path = require('path');
//import get all files
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
    let localCommands = [];

    //define categories by folders
    const commandCategories = getAllFiles(path.join(__dirname, '..', 'commands'), true);

    //get files for commands
    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);

        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);

            //skip if command is in exceptions
            if (exceptions.includes(commandObject.name)){
                continue;
            }
            localCommands.push(commandObject)
        }
    }

    return localCommands;
};