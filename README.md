# NotMantaro

This project was to revive the daily system implemented by the Montaro Discord Bot when it went End-of-Service on March 1st, 2024 for a personal Discord server.
As I did not need the full capabilites of the original Montaro, I used Discord.js to develop a smaller bot that replicated the Montaro dailies system.
I have also implemented the 'Guess That Pokémon' game from Montaro.

## Packages

This project uses the dotenv, discord.js, mongoose, & nodemon packages.
The data for each user was stored in a MongoDB database, and the bot was run on a local machine using nodemon.
The keys were stored in a .env file, and the bot was developed using discord.js.

## Useage

After installing the packages and creating a MongoDB database, you'll need to create a .env with the following
- TOKEN = Your Discord App Development Token
- GUILD_ID = The Guild ID of the server you are deploying the bot to
- CLIENT_ID = The Client ID of the bot within Discord
- DB_URI = The database URI of your MongoDB database
This .env should be placed on the ssame level as the config.jon and src folders.

After creating the .env, you should be able to run nodemon to get the bot up and running on a local machine.

### ***Warning***

*This bot is only designed to be run for a single Discord server*

## Commands
- /daily : Claims the user's daily
- /game pokemon : Plays the 'Guess That Pokémon' game for the user
- /help : List Commands
- /ping : Returns bots response ping (used for lag detection)
- /resetlobby : Resets the game lobby should an error occur

## Copyright Notice

The outline images of Pokémon used in this project are © Nintendo, Game Freak, and Creatures. Pokémon and all associated names, images, and trademarks are property of their respective owners. This project is a fan work and is not affiliated with, endorsed, or sponsored by Nintendo, Game Freak, or The Pokémon Company.
