const { readdirSync } = require("fs");
const { Client } = require("discord.js");

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  const eventFolders = readdirSync("./src/events/distube").filter((f) =>
    f.endsWith(".js")
  );

  const status = (queue) =>
    `Volume: ${queue.volume}% | Filter: ${
      queue.filters.names.join(", ") || "Off"
    } | Loop: ${
      queue.repeatMode
        ? queue.repeatMode === 2
          ? "All Queue"
          : "This Song"
        : "Off"
    } | Autoplay: ${queue.autoplay ? "On" : "Off"}`;

  for (const event of eventFolders) {
    const eventFile = require(`../events/distube/${event}`);

    client.distube.on(eventFile.name, (...args) => {
      eventFile.execute(...args, client, status);
    });
  }
};
