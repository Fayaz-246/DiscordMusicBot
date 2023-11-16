const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "addSong",

  async execute(queue, song, client, status) {
    const embed = new EmbedBuilder()
      .setColor(client.config.successColor)
      .setTitle(`Added Song!`)
      .setDescription(
        `**${client.config.embed.success} | Added ${song.name} to the queue.\nDuration: \`${song.formattedDuration}\`\nRequested by: ${song.user}**`
      );

    queue.textChannel.send({ embeds: [embed] });
  },
};
