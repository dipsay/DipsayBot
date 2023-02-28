const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays a song')
        .addStringOption(option => option
            .setName('searchterms')
            .setDescription('searchterms/url')
            .setRequired(true)),
    run: async ({ client, interaction }) => {
        if (!interaction.member.voice.channel) return interaction.reply('youre not in a vc dumbfuck');
        const queue = await client.player.createQueue(interaction.guild);
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        let embed = new EmbedBuilder();
        if (interaction.options.getString('searchterms').startsWith('https://')) {
            let url = interaction.options.getString('searchterms');
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0) return interaction.reply('no results');
            const song = result.tracks[0];
            await queue.addTrack(song);
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` });
        } else {
            let search = interaction.options.getString('searchterms');
            const result = await client.player.search(search, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            if (result.tracks.length === 0) return interaction.reply('no results');
            const song = result.tracks[0];
            await queue.addTrack(song);
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` });
        }
        if (!queue.playing) await queue.play();
        await interaction.reply({
            embeds: [embed]
        });
    }
}