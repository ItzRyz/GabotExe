const Discord = require("discord.js");
const { readdirSync } = require("fs");
let folder = ["developer", "info", "moderation", "music", "utility"];

module.exports = {
  name: "reload",
  aliases: ["r", "rl"],
  category: "developer",
  description: "sstt",
  run: async (client, message, args, color, queue) => {
    var msg = message;
    if (
      msg.author.id !== "486502585587466240" &&
      msg.author.id !== "449594065248583680"
    )
      return msg.channel.send(`Not developer`);

    readdirSync("./src/cmds/").forEach(async dir => {
      try {
        const commands = readdirSync(`./src/cmds/${dir}/`).filter(file =>
          file.endsWith(".js")
        );
        for (let file of commands) {
          let pull = require(`../../cmds/${dir}/${file}`);
          await client.commands.delete(pull.name, pull);
          await delete require.cache[require.resolve(`.././${dir}/${file}`)];
          if (pull.name) {
            await client.commands.set(pull.name, pull);
            if (pull.aliases && Array.isArray(pull.aliases))
              pull.aliases.forEach(alias =>
                client.aliases.set(alias, pull.name)
              );
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
    let reload = new Discord.MessageEmbed()
      .setDescription(`Berhasil Memuat Ulang Semua Perintah ✅`)
      .setColor(client.color);
    message.channel.send(reload);
  }
};
