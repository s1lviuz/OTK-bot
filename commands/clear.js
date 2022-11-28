const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Limpa todas as mensagens do canal de texto'),
	async execute(interaction) {

		
		await interaction.reply('Limpeza concluida!');
		await wait(1000);
		return await interaction.deleteReply();
	},
};