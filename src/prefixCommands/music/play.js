const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "play",
    description: "Play a song!",
    inVC: true,
  },
  async execute(message, args, client, vc) {
    const embed = new EmbedBuilder();
    const { channel, member } = message;
    const { config } = client;
    const query = args.join(" ");
    if (!query) return message.reply("You did not provide a search query.");

    client.distube.play(vc, query, { textChannel: channel, member: member });
  },
};
