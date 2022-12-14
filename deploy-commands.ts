import { REST, Routes } from 'discord.js';
import fs = require('node:fs');
import { DISCORD_TOKEN, APP_ID, GUILD_ID } from './constants';

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Iniciando carregamento de ${commands.length} (/) comandos.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data: any = await rest.put(
			Routes.applicationGuildCommands(APP_ID, GUILD_ID),
			{ body: commands },
		);

		// The put method is used to fully refresh all commands global
		// const data = await rest.put(
		// 	Routes.applicationCommands(APP_ID),
		// 	{ body: commands },
		// );

		console.log(`Foram carregados com sucesso os ${data.length} (/) comandos.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();