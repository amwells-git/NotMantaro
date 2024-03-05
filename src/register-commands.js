//need dotenv discord.js
require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'testo',
        description: 'Tests Option Slash Commands',
        options: [
            {
                name: 'number',
                description: 'a number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1
                    },
                    {
                        name: 'two',
                        value: 2
                    },
                    {
                        name: 'three',
                        value: 3
                    },
                ],
                required: true
            },
            {
                name: 'numbertwo',
                description: 'another number',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
        ]
    },
    {
        name: 'test',
        description: 'Tests Slash Commands',
    },
    {
        name: 'daily',
        description: 'Claim Your Daily',
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering Slash Commands')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Slash Commands Registered Succesfully')
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();