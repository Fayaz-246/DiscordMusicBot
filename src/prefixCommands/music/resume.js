const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "resume",
    description: "Resume the paused song.",
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

    await que.resume(vc);
    embed
      .setColor(config.successColor)
      .setDescription(`**${config.music.resume} The song has been resumed.**`);

    await message.reply({ embeds: [embed] });
  },
};
