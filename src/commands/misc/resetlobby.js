//uncomment if you need options
//const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'resetlobby',
    description: 'Reset Game Lobby',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {
        client.setMaxListeners(0);
        interaction.reply(`If this doesn't fix the game lobby, the bot probably needs a reset.`);
    }
}
