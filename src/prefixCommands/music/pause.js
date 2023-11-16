const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "pause",
    description: "Pauses the current song.",
    inVC: true,
  },
  async execute(message, args, client, vc) {
    const embed = new EmbedBuilder();
    const { config } = client;
    const que = await client.distube.getQueue(vc);
    if (!que) {
      embed
        .setColor(config.errorColor)
        .setDescription("**There is no active queue.**");

      return await message.reply({ embeds: [embed] });
    }

    await que.pause(vc);
    embed
      .setColor(config.errorColor)
      .setDescription(`**${config.music.pause} Paused the current song.**`);

    message.reply({ embeds: [embed] });
  },
};
