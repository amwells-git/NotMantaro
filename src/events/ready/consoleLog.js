//import activity type from discord.js
const { ActivityType } = require('discord.js')

//log when bot goes online
module.exports = (client) => {
    console.log(`${client.user.tag} is online`);

    //change activity
    client.user.setActivity({
        name: '/help',
        type: ActivityType.Streaming,
        url: 'https://www.twitch.tv/aerontheanimealmanac',
    });
};
