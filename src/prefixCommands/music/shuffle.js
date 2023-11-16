const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "shuffle",
    description: "Shuffle the queue.",
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

    await que.shuffle();
    embed
      .setColor(config.successColor)
      .setDescription(`**${config.music.loop} The queue has been shuffled.**`);

    await message.reply({ embeds: [embed] });
  },
};
