import { REST, Routes } from 'discord.js';
import { DISCORD_TOKEN, APP_ID, GUILD_ID } from './constants';
import logger from './logger';

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN ?? 'null');

// for guild-based commands
rest.put(Routes.applicationGuildCommands(APP_ID ?? 'null', GUILD_ID ?? 'null'), { body: [] })
	.then(() => logger.info('Todos os comandos do servidor foram apagados com sucesso.'))
	.catch(logger.error);

// for global commands
rest.put(Routes.applicationCommands(APP_ID ?? 'null'), { body: [] })
	.then(() => logger.info('Todos os comandos globais foram apagados com sucesso.'))
	.catch(logger.error);