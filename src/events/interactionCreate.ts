import { Events } from 'discord.js';
import logger from '../logger';

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction: any) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            logger.error(`Nenhum comando ${interaction.commandName} foi encontrado.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            logger.error(error);
            await interaction.reply({ content: 'Há um erro na execução desse comando!', ephemeral: true });
        }
    },
};