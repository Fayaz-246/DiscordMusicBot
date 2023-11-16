require("colors");
const { readdirSync } = require("fs");
const { REST, Routes } = require("discord.js");

module.exports = (client) => {
  const commandFolders = readdirSync("./src/prefixCommands");
  const commandArray = [];

  for (folder of commandFolders) {
    const commandFiles = readdirSync(`./src/prefixCommands/${folder}`).filter(
      (file) => file.endsWith(".js")
    );
    for (const file of commandFiles) {
      const command = require(`../prefixCommands/${folder}/${file}`);
      if ("data" in command && "execute" in command) {
        client.prefixCommands.set(command.data.name, command);
        if (command.data.aliases)
          command.data.aliases.forEach((al) => client.aliases.set(al, command));
        commandArray.push(command.data.name);
      } else {
        console.log(`${file} is missing "data" or "execute".`.yellow);
      }
    }
  }

  console.log(
    `[CMDS]`.blue + ` Loaded ${commandArray.length} prefix commands.`
  );
};
