import { Events, ActivityType, Client } from 'discord.js';

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: Client) {
		console.log(`Preparado! Entrou como ${client.user?.tag}`);
		client.user?.setActivity('conversa fora - /help', { type: ActivityType.Playing });
	},
};