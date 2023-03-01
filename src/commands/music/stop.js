const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('kicks dipsay bot'),
    run: async ({ client, interaction }) => {
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply('stop what?');
        queue.stop();
        interaction.reply('wtf!?!? rude.');
    }
}