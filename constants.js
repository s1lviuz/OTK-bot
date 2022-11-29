const dotenv = require('dotenv');

dotenv.config();

const GUILD_ID = process.env.GUILD_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const APP_ID = process.env.APP_ID;

module.exports = { GUILD_ID, DISCORD_TOKEN, PUBLIC_KEY, APP_ID }