const { EmbedBuilder, Client } = require("discord.js");
const config = require("../config.js");

const embed = new EmbedBuilder().setColor(config.embedColor).setTimestamp();

/**
 * @param {Client} client
 */
const buildHelpEmbed = (client) => {
  embed
    .setTitle(`**${client.user.username}'s Help Menu**`)
    .setFooter({
      iconURL: `${client.user.displayAvatarURL()}`,
      text: `${client.user.username}, Prefix: ${config.prefix}`,
    })
    .setDescription(
      `*All commands have both slash & prefix versions*\n\n🎵 **Music**\n> \`/play\` - *Play a song.*\n> \`/stop\` - *Stop the music player.*\n> \`/skip\` - *Skip a song.*\n> \`/pause\` - *Pause the current song.*\n> \`/resume\` - *Resume a paused song.*\n> \`/nowplaying\` - *Shows the current song.*\n> \`/queue\` - *View the music queue.*\n> \`/loop\` - *Loop the current queue.*\n> \`/shuffle\` - *Shuffle the current queue.*\n> \`/volume\` - *Change the volume of the music player.*\n\n⚙️ **Other**\n> \`/help\` - *Displays this embed.*`
    );

  return embed;
};

module.exports = buildHelpEmbed;
