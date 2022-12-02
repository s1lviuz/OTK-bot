import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { stripIndent } from 'common-tags';
import { client } from '../index'

const commandsDesc = stripIndent`
    \`/info user\` - Retorna as informações de um Usuário especifico ou a sua.

    \`/info server\` - Retorna as informações do servidor.

    \`/info ping\` - Responde com Pong!

    \`/info avatar\` - Retorna o avatar do usuário especifico, ou o seu. 
`

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Comandos de informação sobre o servidor e usuários, use /info help para saber mais.')
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
                .setDescription('Retorna a latência da conexão com o bot.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('avatar')
                .setDescription('Retorna o avatar do usuário especifico, ou o seu.')
                .addUserOption(option => option.setName('target').setDescription('O avatar do usuário para ser exibido')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Retorna a lista de comandos de /info.'))
    ,

    async execute(interaction: any) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');

            if (user) {
                await interaction.reply(stripIndent`
                Username: ${user.username}
                ID: ${user.id}
                `);
            } else {
                await interaction.reply(stripIndent`
                Seu username: ${interaction.user.username}
                Seu ID: ${interaction.user.id}
                `);
            }
        }

        else if (interaction.options.getSubcommand() === 'server') {
            await interaction.reply(`Esse servidor é o ${interaction.guild.name} e possui ${interaction.guild.memberCount} membros.`);
        }

        else if (interaction.options.getSubcommand() === 'ping') {
            await interaction.reply(`Latência: ${client.ws.ping}ms.`);
        }

        else if (interaction.options.getSubcommand() === 'avatar') {
            const user = interaction.options.getUser('target');
            if (user) return interaction.reply(`Avatar de ${user.username}: ${user.displayAvatarURL({ dynamic: true })}`);
            return interaction.reply(`Seu avatar: ${interaction.user.displayAvatarURL()}`);
        }

        else if (interaction.options.getSubcommand() === 'help') {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Comandos disponiveis:')
                .setDescription(commandsDesc)
                .setTimestamp()
                .setFooter({ text: 'Powered by OTK Bot', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
            return await interaction.reply({ content: '\n', embeds: [embed] });
        }
    },
};