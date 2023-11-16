module.exports = {
  name: "searchNoResult",
  async execute(message, query, client) {
    message.channel.send(
      `${client.config.embed.error} | No result found for \`${query}\`!`
    );
  },
};
