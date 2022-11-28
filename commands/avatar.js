const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Retorna o avatar do usuário especifico, ou o seu.')
		.addUserOption(option => option.setName('target').setDescription('O avatar do usuário para ser exibido')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (user) return interaction.reply(`Avatar de ${user.username}: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaction.reply(`Seu avatar: ${interaction.user.displayAvatarURL()}`);
	},
};