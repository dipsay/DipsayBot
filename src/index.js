require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.distube = new DisTube(client, {
    leaveOnEmpty: true,
    emptyCooldown: 30,
    searchSongs: 5,
    leaveOnFinish: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    nsfw: true,
    streamType: 0,
    plugins: [new YtDlpPlugin()]
})

//const state = queue => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\` | Filter: \`${queue.filters.join(", ") || "Off"}\``

client.distube
    .on("playSong", (queue, song) => {
        const embed = new EmbedBuilder()
            .setColor("#D9027D")
            .setThumbnail(song.thumbnail)
            .setDescription(`[${song.name}](${song.url})`)
        queue.textChannel.send({ embeds: [embed] })
    })
    .on("addSong", (queue, song) => {
      const embed = new EmbedBuilder()
          .setColor("#D9027D")
          .setThumbnail(song.thumbnail)
          .setDescription(`[${song.name}](${song.url})`)
      queue.textChannel.send({ embeds: [embed] })
  })

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  validationsPath: path.join(__dirname, 'validations'),
  testServer: process.env.TEST_GUILD,
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();