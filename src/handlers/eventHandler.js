//import path
const path = require('path');
//import file loader
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        //sort folders by priority number
        eventFiles.sort((a, b) => a > b);

        //make consistent names
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

        //make event listeners for files
        client.on(eventName, async (arg) => {
            //get commands from files
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                //pass client and arguments
                await eventFunction(client, arg)
            }
        })
    }
};