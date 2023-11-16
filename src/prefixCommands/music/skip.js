const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "skip",
    description: "Skip a song.",
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

    await que.skip(vc);
    embed
      .setColor(config.embedColor)
      .setDescription(
        `**${config.music.skip} The current song has been skipped.**`
      );

    await message.reply({ embeds: [embed] });
  },
};
