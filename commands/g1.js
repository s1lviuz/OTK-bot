const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('g1')
        .setDescription('Retorna uma lista com o titulo das principais noticias do Globo.com'),
    async execute(interaction) {
        const news = await axios({
            method: 'get',
            url: 'https://www.globo.com/'
        })
            .then(response => response.data)
            .then(text => text.match(/<(\h2 class="post__title"+)[\s\S]*?>([\s\S]*?)<\/\h2>/g))
            .then(elements => elements.map(element => {
                return element.replace(/<h2 class="post__title">/, '').replace(/<\/h2>/, ' \n\n ').replace(/&[\s\S]*;/, '')
            }))

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Noticias Globo.com')
            .setAuthor({ name: 'Globo.com', iconURL: 'https://s3.glbimg.com/v1/AUTH_fd78dc4be9404a2e92b908ade306e9e6/prod/globocom_opengraph.png', url: 'https://www.globo.com/' })
            .setDescription(news.slice(0, 9).join(''))
            .setThumbnail('https://s3.glbimg.com/v1/AUTH_fd78dc4be9404a2e92b908ade306e9e6/prod/globocom_opengraph.png')
            .setTimestamp()
            .setFooter({ text: 'Powered by OTK Bot', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        return await interaction.reply({content: '\n', embeds: [embed] });
    },
}