module.exports = {
  name: "error",

  async execute(channel, e, client, status) {
    if (channel)
      channel.send(
        `${client.config.embed.error} | An error encountered: ${e
          .toString()
          .slice(0, 1974)}`
      );
    else console.error(e);
  },
};
