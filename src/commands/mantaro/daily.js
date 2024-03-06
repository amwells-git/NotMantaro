//uncomment if you need options
//const { ApplicationCommandOptionType } = require('discord.js');
//import schema
const User = require('../../models/userProfile');
//import calculation function
const calculateDailyCurrency = require('../../utils/calculateDailyCurrency');

module.exports = {
    name: 'daily',
    description: 'Claim Your Daily',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: async (client, interaction) => {
        //check to make sure command is run inside server
        if (!interaction.inGuild()) {
            interaction.reply({
                content: "This command can only be executed inside a server.",
                ephemeral: true,
            });
            return;
        }

        try {
            await interaction.deferReply();

            //create query
            let user = await User.findOne({
                userId: interaction.member.id,
            });

            //if user found, check streak timing
            if (user) {
                const lastDailyDate = user.lastDailyCollected?.toDateString();
                const currentDate = new Date().toDateString();

                //compare dates
                interaction.editReply("Not Implemented")
                return;
            }
            //if user not found, create a new one!
            else {
                user = new User({
                    userId: interaction.member.id,
                })
            }

            //calculate daily currency and streak
            const calculatedCurrency = calculateDailyCurrency(userProfile)
            userProfile.balance += calculatedCurrency.totalCurrency;

        } catch (error) {
            console.log(`Error handling /daily: ${error}`);
        }
    }
};