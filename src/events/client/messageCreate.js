const { Events, Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    const config = client.config;

    if (!message.content.startsWith(config.prefix)) return;
    if (!message.guild)
      return message.reply({
        content: "Commands can only be used in guilds.",
      });

    const args = message.content
      .toLowerCase()
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    const cmdName = args.shift();
    const command =
      client.prefixCommands.get(cmdName) || client.aliases.get(cmdName);

    if (!command) return;

    try {
      if (command.data.inVC) {
        const { member, guild } = message;
        const channelVoice = member.voice;
        const vc = channelVoice.channel;
        const bot = guild.members.me;
        const embed = new EmbedBuilder();
        if (!vc) {
          embed
            .setColor(config.errorColor)
            .setDescription(
              "**You must be in a voice channel to use this command.**"
            );
          return message.reply({ embeds: [embed] });
        }

        if (
          bot.voice.channelId &&
          channelVoice.channelId != bot.voice.channelId
        ) {
          embed
            .setColor(config.errorColor)
            .setDescription(
              `**You cannot use the music player as it is already active in <#${bot.voice.channelId}>.**`
            );
          return message.reply({ embeds: [embed] });
        }
        await command.execute(message, args, client, vc);
      } else {
        await command.execute(message, args, client);
      }
    } catch (error) {
      console.log(error);
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(config.errorColor)
            .setTitle("An Error Occured While Using This Command.")
            .setDescription(
              `Please report this error: \n\`\`\`js\n${error}\`\`\``
            ),
        ],
      });
    }
  },
};
