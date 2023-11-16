const { EmbedBuilder, Message, Client } = require("discord.js");
const buildHelpEmbed = require("../../embeds/helpEmbed");

module.exports = {
  data: {
    name: "help",
    aliases: ["cmds"],
    description: "Show all of the bots commands.",
  },
  /**
   *
   * @param {Message} message
   * @param {String[]} args
   * @param {Client} client
   */
  async execute(message, args, client) {
    message.reply({ embeds: [buildHelpEmbed(client)] });
  },
};
