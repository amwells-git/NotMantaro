//embed builder
const {EmbedBuilder} = require("discord.js");
//random pokemon name selector
const randomPokemonName = require('./randomPokemonName');

module.exports = (client, interaction) => {
    let pokemon = randomPokemonName();
    let pokembed = new EmbedBuilder()
        .setColor(0xFF66D6)
        .setImage(`attachment://${pokemon}.png`)
        .setFooter({text: 'You have 5 attempts and 1 minute. (Type end to end the game)'})
        .setAuthor({name: `Who's that pokemon?`, iconURL: interaction.user.displayAvatarURL()});

    interaction.editReply({embeds: [pokembed], files: [`./src/assets/pokemonImages/${pokemon}.png`]});
}