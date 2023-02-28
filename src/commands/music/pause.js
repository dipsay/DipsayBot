const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pauses the current song'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guild);
        if (!queue) {
            await interaction.reply('nothing to pause');
            return;
        }
        queue.setPaused(true);
        await interaction.reply('i paused it')
    }
}