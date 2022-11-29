const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const commandsDesc = `
    \`/info\` - Comandos de informação sobre o servidor e usuários, use /info help para saber mais.\n
    \`/g1\` - Retorna uma lista com o titulo das principais noticias do Globo.com.\n
    \`/clear\` - Limpa todas as mensagens do canal de texto. (Em desenvolvimento)\n
`

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Comandos de informação sobre o servidor e usuários, use /info help para saber mais.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Comandos disponiveis:')
            .setDescription(commandsDesc)
            .setTimestamp()
            .setFooter({ text: 'Powered by OTK Bot', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        return await interaction.reply({ content: '\n', embeds: [embed] });
    }
}