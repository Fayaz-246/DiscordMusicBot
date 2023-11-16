const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "stop",
    description: "Stop the music player.",
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

    await que.stop(vc);
    embed
      .setColor(config.errorColor)
      .setDescription(`**${config.music.stop} The queue has been stopped.**`);

    await message.reply({ embeds: [embed] });
  },
};
