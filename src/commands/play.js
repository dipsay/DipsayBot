const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytSearch = require('yt-search');
const ytDown = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a yt videos audio'),
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) return message.channel.send('ur not in a call dumbass');
        message.reply(`you are in ${voiceChannel}`);
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        const search = async (query) => {
            const result = await ytSearch(query);
            return (result.videos.length > 1) ? result.videos[0] : null;
        }
        const video = await search('kickback');
        if (video) {
            const stream = ytDown(video.url, { filter: 'audioonly' });
            const player = createAudioPlayer();
            connection.subscribe(player);
            const resource = createAudioResource(stream)
            player.play(resource)
        }
    }
}