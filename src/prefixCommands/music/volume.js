const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "volume",
    description: "Change the music player's volume.",
    inVC: true,
  },
  async execute(message, args, client, vc) {
    const embed = new EmbedBuilder();
    const { config } = client;
    client.distube.setVolume(vc, volume);
    embed.setColor("Blurple").setDescription(`**🎚️ Set volume to ${volume}%**`);
    message.reply({ embeds: [embed] });
  },
};
