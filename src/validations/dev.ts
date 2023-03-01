module.exports = (interaction, commandObj, handler, client) => {
    if (commandObj.devOnly) {
        if (interaction.member.id !== process.env.DEV) {
            interaction.reply('that command is not for you');
            return true;
        }
    }
}