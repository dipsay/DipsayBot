const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skips the current song'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guild);
        if (!queue) {
            await interaction.reply('nothing to skip');
            return;
        }
        const currentSong = queue.current;
        queue.skip();
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`skipped **${currentSong.title}**`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}