//need dotenv discord.js mongoose nodemon (global install)
require('dotenv').config()
//get client architecture from discord.js
const { Client, IntentsBitField } = require('discord.js');
//import mongoose
const mongoose = require('mongoose')
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

//create client connection to mongodb & start event handler
(async () => {
    try {
        //connect to mongoDB (Maybe look into converting to supabase if you need more
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to DB');

        //call event handler
        eventHandler(client);

        //set check for /game command (when 0, /game command is allowed through, when greater than 0 doesn't allow command through)
        //is currently only way in discord.js (that I know of) to have a cross file boolean, though If I find something else I will use it
        //as of 1.1 build there is no need for Listeners from the client that I need
        client.setMaxListeners(0);

        //login bot to discord
        client.login(process.env.TOKEN);
    } catch (error) {
        console.log(error);
    }
})();
