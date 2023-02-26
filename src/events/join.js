const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    execute(member) {
        let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Soldier');
        member.roles.add(welcomeRole);
    }
}