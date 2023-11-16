const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "finish",
  async execute(queue, client) {
    const embed = new EmbedBuilder()
      .setColor(client.config.embedColor)
      .setDescription(`Queue Finished! Leaving VC.`);
    queue.textChannel.send({ embeds: [embed] });
  },
};
