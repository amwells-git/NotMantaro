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

        //login bot
        client.login(process.env.TOKEN);
    } catch (error) {
        console.log(error);
    }
})();
