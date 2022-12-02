import { SlashCommandBuilder } from 'discord.js';
import { setTimeout } from 'node:timers/promises';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Limpa todas as mensagens do canal de texto'),
	async execute(interaction: any) {


		await interaction.reply('Essa opção ainda está em desenvolvimento. :)');
		await setTimeout(1000);
		return await interaction.deleteReply();
	},
};