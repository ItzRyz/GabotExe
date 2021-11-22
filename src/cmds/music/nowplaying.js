const Discord = require("discord.js");
const db = require("quick.db");
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "music",
    description: "To see the music that is playing",
    run: async (client, message, args, color, queue) => {
      
    let serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("❌ | I'm not playing anything?");
    if (!message.member.voice.channel) return message.channel.send(`❌ | You're not in a voice channel!`);
    if (serverQueue && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`❌ | You are not in my voice channel!`);

    let stream = serverQueue.broadcast.dispatcher.streamTime;
    let total = serverQueue.songs[0].duration2;
    
    let now = `${moment.duration(stream).format("HH[:]mm[:]ss[:]")}`;
    let full = `${moment.duration(total).format("HH[:]mm[:]ss[:]")}`;
    let q = serverQueue.playing ? "🔊" : "🔈";
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${serverQueue.songs[0].request.tag}`, serverQueue.songs[0].request.displayAvatarURL({ dynamic: true }))
      .setTitle("Now Playing!")
      .addField(`[**${serverQueue.songs[0].title}**](${serverQueue.songs[0].url})`)
      .setThumbnail(`https://img.youtube.com/vi/${serverQueue.songs[0].id}/maxresdefault.jpg`)
      .setColor(client.color)
      .setFooter(`${q} | ${now.length < 3 ? `00:${now}` : now} ${client.player.createBar(stream, total)} ${full}`)
   message.channel.send(embed);
         
  }
}