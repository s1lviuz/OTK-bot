import { REST, Routes } from 'discord.js';
import { DISCORD_TOKEN, APP_ID, GUILD_ID } from './constants';

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

// for guild-based commands
rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), { body: [] })
	.then(() => console.log('Todos os comandos do servidor foram apagados com sucesso.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(APP_ID), { body: [] })
	.then(() => console.log('Todos os comandos globais foram apagados com sucesso.'))
	.catch(console.error);