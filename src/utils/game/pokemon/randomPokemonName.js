//picks a random name from list of pokemonNames.csv and returns it
//import file reader
const fs = require('node:fs')

module.exports = () => {
    //list to hold names
    let data;
    let names;
    let randomName = 'error';

    try {
        data = fs.readFileSync('./src/assets/pokemonNames.csv')
    } catch (error) {
        console.error('Error reading pokemonNames: ', error);
        return 'error';
    }

    //make data readable list of names
    names = data.toString().replace(/\n|\r/g, '').split(',');

    //choose random name from list
    randomName = names[Math.floor(Math.random()*names.length)];;

    return randomName;
}