//reccuring code for image games
module.exports = (client, interaction, correctAnswer) => {
    //checks for if player chooses to end game, gets it right, or time runs out, or run out of attempts
    let endGame = false;
    let gotRight = false;
    let noAttempts = false;
    let gameTimeout = true;//needs to be made false if correct answer given or player chose to end game or player ran out of attempts
    //counter for attempts
    let attempts = 5;
    //convert correct answer to lower case and trim any white space (though there shouldn't be any)
    let comparisonCorrectAnswer = correctAnswer.toLowerCase().trim();

    //create messageCollector for game
    const collectionFilter = m => m.author.id === interaction.user.id  && m.channel.id === interaction.channel.id; //stay in channel game was started in and only care about player's input
    const collector = interaction.channel.createMessageCollector({ filter: collectionFilter, time: 60000, max: 5 });

    //handle collection
    collector.on('collect', m => {
        //get content of guess
        const message = m.content.toLowerCase().trim();//convert to lower case for comparison and removing leading and trailing whitespace

        //check end conditions
        if (message === 'end') {
            endGame = true;
            gameTimeout = false;
            collector.stop();
        } else if (message === comparisonCorrectAnswer) {
            gotRight = true;
            gameTimeout = false;
            collector.stop();
        } else {
            attempts -= 1;
            //check if attempts are 0 or less, if they are end game
            if (attempts <= 0) {
                noAttempts = true;
                gameTimeout = false;
                return;
            }
            interaction.followUp(`:x: That's not it, you have ${attempts} attempts remaining.`);
        }
    });

    //handle end conditions
    collector.on('end', collected => {
        //send game end message based on end condition
        if (gameTimeout) {
            interaction.followUp(`:x: Time's Up! The Answer was: ${correctAnswer}`)
        } else if (endGame) {
            interaction.followUp(`:white_check_mark: Ended game. Possible Answers were: ${correctAnswer}`)
        } else if (noAttempts) {
            interaction.followUp(`:x: Already used all attempts, ending game. Answer: ${correctAnswer}`);
        } else if (gotRight) {
            interaction.followUp(`:mega: **${interaction.member.nickname}** just won $${0} credits by answering correctly!`)
        } else {
            interaction.followUp(`Apologies, I've Broken! Please try again!`);
        }

        client.setMaxListeners(0);//allow other games to be played
    });
}