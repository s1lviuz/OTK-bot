const dotenv = require('dotenv');

dotenv.config();

module.export = { 
    GUILD_ID: process.env.GUILD_ID, 
    DISCORD_TOKEN: process.env.DISCORD_TOKEN, 
    PUBLIC_KEY: process.env.PUBLIC_KEY, 
    APP_ID: process.env.APP_ID 
}