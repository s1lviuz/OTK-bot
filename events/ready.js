const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Preparado! Entrou como ${client.user.tag}`);
		client.user.setActivity('conversa fora - /help', { type: ActivityType.Playing });
	},
};