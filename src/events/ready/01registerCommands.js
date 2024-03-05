//import config
const { testServer } = require('../../../config.json');
//import local commands func
const getLocalCommands = require('../../utils/getLocalCommands')
//import application commands
const getApplicationCommands = require('../../utils/getApplicationCommands')
//import check command differences
const areCommandsDifferent = require('../../utils/areCommandsDifferent')

module.exports = async (client) => {
    try {
        //load local commands
        const localCommands = getLocalCommands();
        //load application commands
        const applicationCommands = await getApplicationCommands(client, testServer);

        for (const localCommand of localCommands) {
            //get information of local commands
            const {name, description, options} = localCommand;
            //check if command exists on bot
            const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name);

            //compare commands if they exists
            if (existingCommand) {
                //if command is to be deleted, delete it
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command "${name}"`);
                    continue;
                }

                //if commands are different, update commands
                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });
                    console.log(`Edited Command "${name}"`);
                }
            }
            //add non-existing commands
            else{
                //don't add deleted commands
                if (localCommand.deleted) {
                    console.log(`Skipping registering command "${name}" as it's set to delete`);
                    continue;
                }

                //add new commands
                await applicationCommands.create({
                    name,
                    description,
                    options
                });
                console.log(`Registered command "${name}"`);
            }
        }
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};