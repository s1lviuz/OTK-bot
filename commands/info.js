const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Retorna as informações de um Usuário especifico ou a sua.')
                .addUserOption(option => option.setName('target').setDescription('O usuário')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Retorna as informações do servidor.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('ping')
                .setDescription('Responde com Pong!'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('avatar')
                .setDescription('Retorna o avatar do usuário especifico, ou o seu.')
                .addUserOption(option => option.setName('target').setDescription('O avatar do usuário para ser exibido')))

    ,

    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');

            if (user) {
                await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
            } else {
                await interaction.reply(`Seu username: ${interaction.user.username}\nSeu ID: ${interaction.user.id}`);
            }
        }

        else if (interaction.options.getSubcommand() === 'server') {
            await interaction.reply(`Esse servidor é o ${interaction.guild.name} e possui ${interaction.guild.memberCount} membros.`);
        }

        else if (interaction.options.getSubcommand() === 'ping') {
            await interaction.reply(`Pong!`);
        }

        else if (interaction.options.getSubcommand() === 'avatar') {
            const user = interaction.options.getUser('target');
            if (user) return interaction.reply(`Avatar de ${user.username}: ${user.displayAvatarURL({ dynamic: true })}`);
            return interaction.reply(`Seu avatar: ${interaction.user.displayAvatarURL()}`);
        }
    },
};