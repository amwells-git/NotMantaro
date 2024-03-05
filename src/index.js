//need dotenv discord.js nodemon (global install)
require('dotenv').config()
//get client architecture from discord.js
const { Client, IntentsBitField } = require('discord.js');
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

//call event handler
eventHandler(client);

//login bot
client.login(process.env.TOKEN);
