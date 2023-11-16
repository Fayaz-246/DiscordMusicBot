const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "nowplaying",
    aliases: ["np", "currentsong"],
    description: "Shows the current song",
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

    const song = que.songs[0];

    embed
      .setColor(config.embedColor)
      .setThumbnail(song.thumbnail)
      .setTitle(`${config.music.play} Now Playing...`)
      .setFooter({ text: `Requested By: ${song.user.globalName}` })
      .setDescription(
        `Playing: **${song.name}**\nUploader: **[${song.uploader.name}](${song.uploader.url})**\nDuration: \`${song.formattedDuration}\``
      );
    message.reply({ embeds: [embed] });
  },
};
