//uncomment if you need options
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');//some games use the embed builder
//import randomPokemonName function
const pokemon = require('../../utils/game/pokemon/pokemon')

module.exports = {
    name: 'game',
    description: 'Play a game',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'game',
            description: 'What game you want to play',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'pokemon',
                    value: 'pokemon_game',
                }
            ]
        },
    ],
    // deleted: Boolean,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        let game = interaction.options.get('game').value;

        console.log(game)

        if (game === 'pokemon_game') {
            pokemon(client, interaction);
        }
    }
}