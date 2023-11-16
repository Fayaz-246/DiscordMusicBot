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
    .setName("loop")
    .setDescription("Loop the current queue.")
    .addStringOption((o) =>
      o
        .setName("mode")
        .setDescription("Loop mode")
        .addChoices(
          { name: "off", value: "1" },
          { name: "song", value: "2" },
          { name: "queue", value: "3" }
        )
        .setRequired(true)
    ),
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
    const type = options.getString("mode");
    const bot = interaction.guild.members.me;
    let mode = null;
    if (type === "1") mode = 1;
    else if (type === "2") mode = 2;
    else if (type === "3") mode = 3;

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

      mode = que.setRepeatMode(mode);
      mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";

      embed
        .setColor(config.successColor)
        .setDescription(
          `**${config.music.loop} | Set repeat mode to \`${mode}\`**`
        );

      interaction.reply({ embeds: [embed] });

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
