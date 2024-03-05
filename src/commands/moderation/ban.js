//uncomment if you need options, added permission flags
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'testing things',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'user',
            description: 'Bans a member!!!',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'why you ban',
            type: ApplicationCommandOptionType.String,
        },
    ],
    deleted: true,

    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply(`You can't ban anyone, loser!`);
    }
}