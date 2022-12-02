import fs = require('node:fs');
import path = require('node:path');
import { DISCORD_TOKEN } from './constants';

// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';

// Create a new client instance
const client: any = new Client({ intents: [GatewayIntentBits.Guilds] });

// Command handling
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] O comando em ${filePath} está faltando a propriedade "data" ou "execute" requeridas.`);
	}
}

// Event handling
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args: any) => event.execute(...args));
	} else {
		client.on(event.name, (...args: any) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);