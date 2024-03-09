//uncomment if you need options
//const { ApplicationCommandOptionType } = require('discord.js');
//import schema
const User = require('../../models/userProfile');
//import currency calculation function
const calculateDailyCurrency = require('../../utils/calculateDailyCurrency');
//import timeFromMilliseconds to calculate time till next daily claim allowed
const timeFromMilliseconds = require('../../utils/timeFromMilliseconds');
//number of milliseconds in a day (for time checking
const MilliSecsDay = 86400000

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

            //see if missed daily & set local streak, also preset dailySaved
            let dailySaved = false;
            let missedDaily = false;
            let streak = 0;
            //local daily savers for later loops, and allow wider use of timeBetween
            let l_dailySavers;
            let usedSavers;
            let timeBetween;

            //create query
            let user = await User.findOne({
                userId: interaction.member.id,
            });

            //if user found, check streak timing
            if (user) {
                const lastDailyDate = user.lastDailyCollected//?.toDateString();
                const currentDate = new Date()//.toDateString();

                //calculate milliseconds
                timeBetween = currentDate.getTime() - lastDailyDate.getTime();
                //if still in the original 24-hour period, tell next daily collection time then return
                if (timeBetween < MilliSecsDay){
                    //calculate time till next allowed claim
                    const remainingTime = timeFromMilliseconds(MilliSecsDay - timeBetween);

                    //tell user how long they have to wait to claim next daily
                    interaction.editReply(`:stopwatch: Whoa... you're calling me a bit too fast... I might get dizzy! (Ratelimited) `+
                        `\n**You'll be able to use this command again in ${remainingTime.readableTime}.**`+
                        `\nYou can run daily once a day. If you need to check, you can't use \`/daily check:true\`. Enjoy!`);
                    return;
                } // if past 48-hours
                else if (timeBetween > 2*MilliSecsDay){
                    missedDaily = true;//user missed window to claim daily to keep streak
                }
                //if inbetween a day and two days (Past original 24-hours but not past 48-hours), allow claiming of dailies
            }
            //if user not found, create a new one!
            else {
                missedDaily = false;
                user = new User({
                    userId: interaction.member.id,
                });
            }

            //if missed daily, check if there's enough dailySavers to keep streak, Streak Time is doubled for each saver
            if (missedDaily) {
                if (user.dailySavers >= 1) {
                    l_dailySavers = user.dailySavers;
                    usedSavers = 1;//how many savers required to
                    while (missedDaily && l_dailySavers - usedSavers > 0) {
                        if (timeBetween < 2*usedSavers*MilliSecsDay){
                            dailySaved = true;
                            missedDaily = false;
                            user.dailySavers -= usedSavers;
                        } else {
                            usedSavers += 1;
                        }
                    }//don't use savers if they can't save streak
                }
            }

            //calculate daily currency and streak
            if (missedDaily){//if forgot to claim daily on time
                //reset streak & saverStreak
                streak = user.dailyStreak;
                user.dailyStreak = 1;

                //calcualte recieved currency
                const calculatedCurrency = calculateDailyCurrency(user.dailyStreak);

                //add recieved currenct
                user.balance += calculatedCurrency.totalCurrency;

                //update daily collection date
                user.lastDailyCollected = new Date();

                //save updated information to db
                await user.save();

                //tell users the bad news about forgetting to claim their daily on time
                interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.`+
                `\n\n2+ days have passed since your last daily, so your streak of \`${streak}x\` got reset :(`);
            } else {
                //calculate received currency by streak
                const calculatedCurrency = calculateDailyCurrency(user.dailyStreak);
                //update streak count
                user.dailyStreak += 1;
                streak = user.dailyStreak;
                //add received currency
                user.balance += calculatedCurrency.totalCurrency;

                //update dailySaver & set receivedSaver
                let receivedSaver = false;
                if (user.dailyStreak % 50 === 0 &&  !dailySaved) {//dont use and give a daily saver
                    user.dailySavers +=1;
                    receivedSaver = true;
                }

                //update daily collection date
                user.lastDailyCollected = new Date();

                //save updated information to db
                await user.save();

                //determine if they got a new dailySaver or had to use on or had neither
                if (dailySaved){//used a daily saver
                    if (calculatedCurrency.streakDays >= 5) {
                        interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.
                        \nStreak up! Current streak: \`${streak}x\`\nYour \`Magical Watches\` saved your streak! You used \'${usedSavers}\' of them to extend your streaks survival time to ***${2*usedSavers}x*** you have \'${user.dailySavers}\' of them remaining!`+
                        `\nYou won a bonus of $${calculatedCurrency.bonusCurrency} for claiming your daily for 5 days in a row or more! (Included in money shown!)`);
                    } else {
                        if (streak <= 1){
                            interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.
                            \nStreak up! Current streak: \`${streak}x\`\nYour \`Magical Watches\` saved your streak! You used \'${usedSavers}\' of them to extend your streaks survival time to ***${2*usedSavers}x*** you have \'${user.dailySavers}\' of them remaining!`)
                        } else {
                            interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.
                            \nStreak up! Current streak: \`${streak}x\`\nYour \`Magical Watches\` saved your streak! You used \'${usedSavers}\' of them to extend your streaks survival time to ***${2*usedSavers}x*** you have \'${user.dailySavers}\' of them remaining!`+
                            `\nYou won a bonus of $${calculatedCurrency.bonusCurrency} for claiming your daily for ${calculatedCurrency.streakDays} days in a row! (Included in money shown!)`);
                        }
                    }
                } else if (receivedSaver){//got a dailySaver
                    if (calculatedCurrency.streakDays >= 5) {
                        interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.
                        \nStreak up! Current streak: \`${streak}x\`\nYou won a \`Magic Watch\` because your daily streak is a multiple of 50! Enjoy.`+
                        `\nYou won a bonus of $${calculatedCurrency.bonusCurrency} for claiming your daily for 5 days in a row or more! (Included in money shown!)`);
                    } else {
                        if (streak <= 1){
                            interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.
                            \nStreak up! Current streak: \`${streak}x\`\nYou won a \`Magic Watch\` because your daily streak is a multiple of 50! Enjoy.`)
                        } else {
                            interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.
                            \nStreak up! Current streak: \`${streak}x\`\nYou won a \`Magic Watch\` because your daily streak is a multiple of 50! Enjoy.`+
                            `\nYou won a bonus of $${calculatedCurrency.bonusCurrency} for claiming your daily for ${calculatedCurrency.streakDays} days in a row! (Included in money shown!)`);
                        }
                    }
                } else {//didn't use or recieve a daily saver
                    if (calculatedCurrency.streakDays >= 5) {
                        interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.
                        \nStreak up! Current streak: \`${streak}x\`\nYou won a bonus of $${calculatedCurrency.bonusCurrency} for claiming your daily for 5 days in a row or more! (Included in money shown!)`);
                    } else {
                        if (streak <= 1){
                            interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.
                            \nStreak up! Current streak: \`${streak}x\``)
                        } else {
                            interaction.editReply(`:white_check_mark: You got **$${calculatedCurrency.totalCurrency}** daily credits.
                            \nStreak up! Current streak: \`${streak}x\`\nYou won a bonus of $${calculatedCurrency.bonusCurrency} for claiming your daily for ${calculatedCurrency.streakDays} days in a row! (Included in money shown!)`);
                        }
                    }
                }
            }
        } catch (error) {
            console.log(`Error handling /daily: ${error}`);
        }
    }
};