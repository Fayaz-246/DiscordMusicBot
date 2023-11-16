const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
  VoiceChannel,
  GuildEmoji,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Change the volume of the music player.")
    .addNumberOption((option) =>
      option
        .setName("percent")
        .setDescription("Volume, 10 = 10%")
        .setRequired(true)
        .setMaxValue(100)
        .setMinValue(1)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @returns
   */
  async execute(interaction, client) {
    const { options, member, guild, channel } = interaction;

    const config = client.config;
    const volume = options.getNumber("percent");
    const embed = new EmbedBuilder();
    const channelVoice = member.voice;
    const vc = channelVoice.channel;
    const bot = interaction.guild.members.me;

    if (!vc) {
      embed
        .setColor(config.errorColor)
        .setDescription(
          "**You must be in a voice channel to use this command.**"
        );
      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }

    if (bot.voice.channelId && channelVoice.channelId != bot.voice.channelId) {
      embed
        .setColor(config.errorColor)
        .setDescription(
          `**You cannot use the music player as it is already active in <#${bot.voice.channelId}>.**`
        );
      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }

    try {
      client.distube.setVolume(vc, volume);
      embed
        .setColor("Blurple")
        .setDescription(`**🎚️ Set volume to ${volume}%**`);
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      embed
        .setColor(config.errorColor)
        .setTitle("An Error Occured While Using This Command.")
        .setDescription(`Please report this error: \n\`\`\`js\n${error}\`\`\``);
      interaction.reply({ ephemeral: true, embeds: [embed] });
    }
  },
};
