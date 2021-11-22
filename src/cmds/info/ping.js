const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  run: async (client, message, args) => {
    const msg = await message.channel.send(`🏓 Pinging....`);

    setTimeout(() => {
      let latency = Math.round(Discord.createdTimestamp - message.createdTimestamp);
      let api = client.ws.ping ? Math.round(client.ws.ping) : 0;

      const embed = new MessageEmbed()
        .addField("Bot Latency", `${latency}ms`)
        .addField("API Latency", `${api}ms`)
        .setColor("BLURPLE")
        .setFooter(
          `Requested by: ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        );
      msg.edit(embed);
    }, 2000);
  }
};
