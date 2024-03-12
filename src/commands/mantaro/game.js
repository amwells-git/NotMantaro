//uncomment if you need options
const { ApplicationCommandOptionType } = require('discord.js');
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
        //findout what game they wish to play
        let game = interaction.options.get('game').value;

        //make sure no one else can run a /game while a game is running
        if (client.getMaxListeners() > 0) {
            interaction.editReply(`:x: Cannot start a new game lobby when there is a game currently running. (If this is an error, tell an admin to run \`/resetlobby\`)`);
            return;
        }
        //set game lobby check
        client.setMaxListeners(1);


        //start game's related controller
        if (game === 'pokemon_game') {
            pokemon(client, interaction);
        }
    }
}