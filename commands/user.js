require("dayjs/locale/pt-br");
const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const relativeTime = require("dayjs/plugin/relativeTime");
const { SlashCommandBuilder } = require('discord.js');

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Retorna as informações do usuário.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Esse comando foi disparado por ${interaction.user.username}, que entrou no servidor em ${dayjs(interaction.member.joinedAt).format("L LT")}.`);
	},
};