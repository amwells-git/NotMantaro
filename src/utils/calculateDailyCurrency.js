//calculates amount of credits to give, returns object with total currency, bonus currency, streak days

module.exports = (dailyStreak) => {
    //define return object variables
    let bonusCurrency, totalCurrency, streakDays;

    //calculate total currency and bonus currency
    if (dailyStreak <= 5) {
        bonusCurrency = 250 * dailyStreak;
        totalCurrency = 350 + bonusCurrency;
        streakDays = dailyStreak;
    } else {//any streak above 5 just earns a 5 day streak bonus
        bonusCurrency = 250 * 5;
        totalCurrency = 350 + bonusCurrency;
        streakDays = 5;
    }
    //return calculations in object
    return {
        bonusCurrency: bonusCurrency,
        totalCurrency: totalCurrency,
        streakDays: streakDays,
    }
};