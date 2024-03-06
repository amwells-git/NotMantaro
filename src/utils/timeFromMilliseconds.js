//convert milliseconds into hours minutes seconds
module.exports = (milliseconds) => {
    //get hours from milliseconds
    let h = milliseconds / (1000 * 60 * 60);
    let hours = Math.floor(h);

    //get remaining milliseconds from hours and convert to minutes
    let m = (h - hours) * 60;
    let minutes = Math.floor(m);

    //get remaining milliseconds from minutes and convert to seconds
    let s = (m - minutes) * 60;
    let seconds = Math.floor(s);

    //put together string with readable time for use in strings
    //create readable hours
    let readableHours = `${hours > 0 ? hours = 1 ? hours + ' hours ' : ' hour ' : ''}`;

    //create readable minutes
    let readableMinutes = `${minutes > 0 ? minutes = 1 ? minutes + ' minutes ' : minutes + ' minute ' : ''}`;

    //create readable seconds
    let readableSeconds = `${seconds > 0 ? seconds = 1 ? seconds + ' seconds' : seconds + ' second' : ''}`;

    //create readable time as single string
    let readableTime;
    if (hours !== 0 && minutes !== 0 && seconds !== 0){
        readableTime = readableHours + ', ' + readableMinutes + 'and ' + readableSeconds;
    } else if (hours !== 0 && minutes === 0 && seconds !== 0) {//no minutes
        readableTime = readableHours +  'and ' + readableSeconds;
    } else if (hours !== 0 && minutes !== 0 && seconds === 0) {//no seconds
        readableTime = readableHours + 'and ' + readableMinutes;
    } else if (hours === 0 && minutes !== 0 && seconds !== 0) {//no hours
        readableTime = readableMinutes + 'and ' + readableSeconds;
    } else if (hours !== 0 && minutes === 0 && seconds === 0) {//no minutes or seconds
        readableTime = readableHours;
    } else if (hours === 0 && minutes !== 0 && seconds === 0) {//no hours or seconds
        readableTime = readableMinutes;
    } else if (hours === 0 && minutes === 0 && seconds !== 0) {//no hours or minutes
        readableTime = readableSeconds;
    } else {
        readableTime = `Couldn't create time string`
    }

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        readableTime: readableTime,
    }
}