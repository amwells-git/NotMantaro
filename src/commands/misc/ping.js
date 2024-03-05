//uncomment if you need options
//const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Pong!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {
        interaction.reply(`Pong!!! ${client.ws.ping}ms`);
    }
}