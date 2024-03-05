//import config
const { devs, testServer } = require('../../../config.json');
//import local commands
const getLocalCommands = require('../../utils/getLocalCommands')

module.exports = async (client, interaction) => {
    //if not a command ignore
    if (!interaction.isChatInputCommand()) return;

    //get functions of commands
    const localCommands = getLocalCommands();

    try {
        //check if command matches local command
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        //handle options
        //command exists
        if (!commandObject) return;

        //check if only developers are allowed to run this command
        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "Only Devs are allowed to run this command",
                    ephemeral: true, //only person running command can see message
                });
                return;
            }
        }

        //check if on test server
        if (commandObject.testOnly) {
            if (!(interaction.guild.id === testServer)) {
                interaction.reply({
                    content: "This command cannot be ran here.",
                    ephemeral: true,
                });
                return;
            }
        }

        //check user has permissions
        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'Not Enough Permissions',
                        ephemeral: true
                    });
                    return;
                }
            }
        }

        //check bot has permissions
        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)){
                    interaction.reply({
                        content: "I don't have enough permissions.",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        await commandObject.callback(client, interaction);

    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};