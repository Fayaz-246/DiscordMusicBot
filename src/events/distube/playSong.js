const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "playSong",

  async execute(queue, song, client, status) {
    const embed = new EmbedBuilder()
      .setColor(client.config.embedColor)
      .setTitle("Playing...")
      .setFooter({ text: `${status(queue)}` })
      .setDescription(
        `**${client.config.music.play} | Playing \`${song.name}\`\nDuration: \`${song.formattedDuration}\`\nRequested by: ${song.user}**`
      );

    queue.textChannel.send({ embeds: [embed] });
  },
};
