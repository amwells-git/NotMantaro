//uncomment if you need options
//const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Replies With Bot Ping (Check Bot Can Respond)',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        // calculate time
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        // reply with time
        interaction.editReply(`Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
    }
}