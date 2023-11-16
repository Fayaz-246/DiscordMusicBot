const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const buildHelpEmbed = require("../../embeds/helpEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("See all of the bots commands."),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @returns
   */
  async execute(interaction, client) {
    await interaction.reply({
      embeds: [buildHelpEmbed(client)],
    });
  },
};
