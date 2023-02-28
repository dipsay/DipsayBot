const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('resumes the current song'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guild);
        if (!queue) {
            await interaction.reply('nothing to resume');
            return;
        }
        queue.setPaused(false);
        await interaction.reply('i resumed it')
    }
}