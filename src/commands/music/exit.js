const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exit')
        .setDescription('kicks dipsaybot ;('),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guild);
        if (!queue) {
            await interaction.reply('?');
            return;
        }
        queue.destroy();
        await interaction.reply('wtf?!?!? rude.');
    }
}