require("colors");
const { Events, Client } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    console.log("[INFO]".blue + ` ${client.user.username} is online!`);
  },
};
