//need dotenv discord.js nodemon (global install)
require('dotenv').config()
//get client architecture from discord.js
const { Client, IntentsBitField, ActivityType } = require('discord.js');
//import event handler
const eventHandler = require('./handlers/eventHandler')

//create new bot client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

/*

//listen to interactions
client.on('interactionCreate', (interaction) => {
    //don't do anything if not slash command
    if (!interaction.isChatInputCommand()) return;

    //test commands
    if (interaction.commandName === 'testo') {
        const num1 = interaction.options.get('number')?.value;
        const num2 = interaction.options.get('numbertwo')?.value;
        interaction.reply(`why'd you give me ${num1} & ${num2}?`);
    }

    //check for daily command
    if (interaction.commandName === 'daily'){
        interaction.reply("this isn't set up yet dumbass");
    }
});

//react to messages
client.on('messageCreate', (message) => {
    //check channel is test channel id
    if (message.channelId === '1212955162377715742' && !message.author.bot) {
        if (message.content === 'daily'){
            message.reply("That's not how this works");
        }
    }
});

 */

//event handler
eventHandler(client);

//login bot
client.login(process.env.TOKEN);
