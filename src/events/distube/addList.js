module.exports = {
  name: "addList",

  async execute(queue, playlist, client, status) {
    queue.textChannel.send(
      `${client.config.embed.success} | Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
    );
  },
};
