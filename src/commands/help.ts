import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { stripIndent } from 'common-tags';

const commandsDesc = stripIndent`
    \`/info\` - Comandos de informação sobre o servidor e usuários, use /info help para saber mais.

    \`/g1\` - Retorna uma lista com o titulo das principais noticias do Globo.com.

    \`/clear\` - Limpa todas as mensagens do canal de texto. (Em desenvolvimento)
`

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Comandos de informação sobre o servidor e usuários, use /info help para saber mais.'),
    async execute(interaction: any) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Comandos disponiveis:')
            .setDescription(commandsDesc)
            .setTimestamp()
            .setFooter({ text: 'Powered by OTK Bot', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        return await interaction.reply({ content: '\n', embeds: [embed] });
    }
}