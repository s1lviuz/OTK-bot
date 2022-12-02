import { Events, ActivityType, Client } from 'discord.js';
import logger from '../logger';

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: Client) {
		logger.info(`Preparado! Entrou como ${client.user?.tag}`);
		client.user?.setActivity('conversa fora - /help', { type: ActivityType.Playing });
	},
};