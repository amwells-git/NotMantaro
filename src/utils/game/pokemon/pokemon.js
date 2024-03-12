//pokemon guessing game controller
//embed builder
const {EmbedBuilder} = require("discord.js");
//import imageGame core code
const imageGame = require('../core/imageGame');
//random pokemon name selector
const randomPokemonName = require('./randomPokemonName');

module.exports = (client, interaction) => {
    //get random pokemon for game
    let pokemon = randomPokemonName();//% in name is meant to be space in name
    //create embed
    let pokembed = new EmbedBuilder()
        .setColor(0xFF66D6)
        .setImage(`attachment://${pokemon.replace('%', '-')}.png`)
        .setFooter({text: 'You have 5 attempts and 1 minute. (Type end to end the game)'})
        .setAuthor({name: `Who's that pokemon?`, iconURL: interaction.user.displayAvatarURL()});

    //send embed and start game
    interaction.editReply({embeds: [pokembed], files: [`./src/assets/pokemonImages/${pokemon.replace('%', '-')}.png`]});
    imageGame(client, interaction, pokemon.replace('%', ' '));//call game lobby code
}