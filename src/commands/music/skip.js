const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skips the current song'),
    run: async ({ client, interaction }) => {
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply('skip what?');
        await queue.skip();
        interaction.reply('skipped!');
    }
}
