import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import { DISCORD_TOKEN, APP_ID, GUILD_ID } from './constants';
import logger from './logger';

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN ?? 'null');

// and deploy your commands!
(async () => {
	try {
		logger.info(`Iniciando carregamento de ${commands.length} (/) comandos.`)

		// The put method is used to fully refresh all commands in the guild with the current set
		const data: any = await rest.put(
			Routes.applicationGuildCommands(APP_ID ?? 'null', GUILD_ID ?? 'null'),
			{ body: commands },
		);

		// The put method is used to fully refresh all commands global
		// const data = await rest.put(
		// 	Routes.applicationCommands(APP_ID),
		// 	{ body: commands },
		// );

		logger.info(`Foram carregados com sucesso os ${data.length} (/) comandos.`)
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		logger.error(error)
	}
})();