//pokemon guessing game controller
//embed builder
const {EmbedBuilder} = require("discord.js");
//random pokemon name selector
const randomPokemonName = require('./randomPokemonName');

module.exports = (client, interaction) => {
    //get random pokemon for game
    let pokemon = randomPokemonName();
    //create embed
    let pokembed = new EmbedBuilder()
        .setColor(0xFF66D6)
        .setImage(`attachment://${pokemon}.png`)
        .setFooter({text: 'You have 5 attempts and 1 minute. (Type end to end the game)'})
        .setAuthor({name: `Who's that pokemon?`, iconURL: interaction.user.displayAvatarURL()});

    //send embed and start game
    interaction.editReply({embeds: [pokembed], files: [`./src/assets/pokemonImages/${pokemon}.png`]});

    //create messageCollector
    const collectionFilter = m => m.author.id === interaction.user.id  && m.channel.id === interaction.channel.id;
    const collector = interaction.channel.createMessageCollector({ filter: collectionFilter, time: 60000, max: 5});

    //handle collection
    collector.on('collect', m => {
        interaction.followUp('collect somethin');
        console.log('collected this: ', m);
        //collector.stop() // stops collector, need to use boolean to check for failure message
    })

    //handle timer runs out
    collector.on('end', collected => {
        interaction.followUp('Collecting Over!');
        console.log('collected all this: ', collected);
    })
}