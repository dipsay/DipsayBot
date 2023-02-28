const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('shows the first 10 songs in the queue'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) {
            await interaction.reply('what queue fucktard');
            return;
        }
        const queueString = queue.tracks.slice(0, 10).map((song, i) => {
            return `${i + 1}) [${song.duration}]\ ${song.title} - <@{song.requestedBy.id}>`;
        }).join('\n');
        const currentSong = queue.current;
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**currently playing:**\n\` ${currentSong.title} - <@${currentSong.requestedBy.id}>\n\n**queue:**\n${queueString}`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}