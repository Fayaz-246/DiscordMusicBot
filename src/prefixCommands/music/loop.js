const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "loop",
    description: "Loop the queue",
    aliases: ["repeat"],
    inVC: true,
  },
  async execute(message, args, client, vc) {
    const { config } = client;
    const type = args[0];
    if (!type)
      return message.reply(
        "You did not provide a loop mode: `off`, `queue`, `song`"
      );
    let mode = null;
    const embed = new EmbedBuilder();
    if (type === "off") mode = 1;
    else if (type === "song") mode = 2;
    else if (type === "queue") mode = 3;
    if (mode === null)
      return message.reply(
        "You did not provide a *valid* loop mode: `off`, `queue`, `song`"
      );
    const que = await client.distube.getQueue(vc);
    if (!que) {
      embed
        .setColor(config.errorColor)
        .setDescription("**There is no active queue.**");

      return await message.reply({ embeds: [embed] });
    }

    mode = que.setRepeatMode(mode);
    mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";

    embed
      .setColor(config.successColor)
      .setDescription(
        `**${config.music.loop} | Set repeat mode to \`${mode}\`**`
      );

    message.reply({ embeds: [embed] });
  },
};
