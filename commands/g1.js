const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('g1')
        .setDescription('Retorna uma lista com o titulo das 10 principais noticias do Globo.com'),
    async execute(interaction) {
        const news = await axios({
            method: 'get',
            url: 'https://www.globo.com/'
        })
            .then(response => response.data)
            .then(text => text.match(/<(\h2 class="post__title"+)[\s\S]*?>([\s\S]*?)<\/\h2>/g))
            .then(elements => elements.map(element => {
                return element.replace('<h2 class="post__title">', '').replace(/<\/h2>/, ' \n ')
            }))
        await interaction.reply(news.slice(0, 4).join(''));
        return interaction.followUp(news.slice(5, 9).join(''));
    },
}