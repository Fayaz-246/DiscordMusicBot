const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "queue",
    description: "View the song queue.",
    inVC: true,
    aliases: ["q"],
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

    embed
      .setColor(config.embedColor)
      .setDescription(
        `${que.songs.map(
          (song, id) =>
            `\n\`${id + 1} - \` **${song.name}** - \`${
              song.formattedDuration
            }\``
        )}`
      );

    await message.reply({ embeds: [embed] });
  },
};
