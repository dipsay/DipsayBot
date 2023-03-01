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
        if (!voiceChannel) return interaction.reply('youre not is a vc dumbfuck');
        client.distube.play(voiceChannel, interaction.options.getString('terms'), {
            textChannel: interaction.channel,
            member: interaction.member,
            interaction
        })
        interaction.reply('got it!');
    }
}