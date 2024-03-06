// //import schema
// const Level = require('../../models/level');
// //import xpcalc
// const calculateLevelXp = require('../../utils/calculateLevelXp');
//
// //creaet intellisense
// const { Client, Message } = require('discord.js');
//
// function getRandomXp(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) +min;
// }
//
// /**
//  * @param {Client} client
//  * @param {Message} message
//  */
module.exports = async (client, message) => {
    // //only add xp if not bot or was sent in server
    // if (!message.inGuild() || message.author.bot) return;
    //
    // const xpToGive = getRandomXp(5, 15);
    //
    // //deal with database
    // const query = {
    //     userId: message.author.id,
    //     guildId: message.guild.id,
    // };
    //
    // try {
    //     const level = await Level.findOne(query);
    //
    //     //if level exists
    //     if (level) {
    //         level.xp += xpToGive;
    //         //check if xp is more than required for level
    //         if (level.xp > calculateLevelXp(level.level)) {
    //             level.xp = 0;
    //             level.level += 1;
    //
    //             //tell member they leveled up
    //             message.channel.send(`${message.member} you leveled up to **level ${level.level}**.`);
    //         }
    //
    //         //save to db
    //         await level.save().catch((e) => {
    //             console.log(`Error saving updated level ${e}`);
    //             // return;
    //         });
    //     }
    //
    //     //if there is no level in db
    //     else {
    //         //create new level
    //         const newLevel = new Level({
    //             userId: message.author.id,
    //             guildId: message.guild.id,
    //             xp: xpToGive,
    //         });
    //
    //         await newLevel.save();
    //     }
    // } catch (error) {
    //     console.log(`Error giving xp: ${error}`);
    // }
}