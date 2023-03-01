const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays yt audio')
        .addStringOption(option => option
            .setName('terms')
            .setDescription('searchterms')
            .setRequired(true)),
    run: async ({ client, interaction }) => {
        const voiceChannel = interaction.member.voice.channel;
        const queue = await client.distube.getQueue(interaction);
        const query = interaction.options.getString('terms');
        if (!voiceChannel) return interaction.reply('youre not is a vc dumbfuck');
        if (queue) {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.reply('diff vc dumbfuck');
        }
        client.distube.play(voiceChannel, query, {
            textChannel: interaction.channel,
            member: interaction.member,
            interaction
        })
    }
}