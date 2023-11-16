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
    .setName("skip")
    .setDescription("Skip the current song."),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @returns
   */
  async execute(interaction, client) {
    const { options, member, guild, channel } = interaction;

    const config = client.config;
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
      const que = await client.distube.getQueue(vc);
      if (!que) {
        embed
          .setColor(config.errorColor)
          .setDescription("**There is no active queue.**");

        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      await que.skip(vc);
      embed
        .setColor(config.embedColor)
        .setDescription(
          `**${config.music.skip} The current song has been skipped.**`
        );

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      embed
        .setColor(config.errorColor)
        .setTitle("An Error Occured While Using This Command.")
        .setDescription(`Please report this error: \n\`\`\`js\n${error}\`\`\``);
      interaction.reply({ ephemeral: true, embeds: [embed] });
    }
  },
};
