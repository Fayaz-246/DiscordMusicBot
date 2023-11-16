require("dotenv/config");
require("colors");

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { readdirSync } = require("fs");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel, Partials.GuildMember, Partials.Message],
});
client.interactions = new Map();
client.prefixCommands = new Map();
client.aliases = new Map();
client.config = require("./config.js");
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: true,
  plugins: [new SpotifyPlugin()],
});

const handlerFolder = readdirSync("./src/handlers").filter((f) =>
  f.endsWith(".js")
);
for (const handler of handlerFolder) {
  const handlerFile = require(`./handlers/${handler}`);
  handlerFile(client);
}

client.login(process.env.Token);
