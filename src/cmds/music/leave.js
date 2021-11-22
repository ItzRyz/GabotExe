const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "leave",
  aliases: ["dc"],
  category: "music",
  description: "To disconecting from voice",
  run: async (client, message, args, color, queue) => {
    
    const serverQueue = queue.get(message.guild.id);
    let lang = await db.fetch(`${message.guild.id}.lang.bhs`);

    try {
      if (lang == true) {
          if (!message.member.voice.channel) return message.channel.send("Kamu tidak berada di dalam channel!");
        const voiceChannel = message.member.voice.channel;
          if (queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id)
           return message.channel.send(`Kamu harus berada di **${queue.get(message.guild.id).voiceChannel.name}** untuk mengeluarkan bot!`);
           message.member.voice.channel.leave();
           await queue.delete(message.guild.id);
           serverQueue.broadcast.dispatcher.end();
           return message.channel.send(":mailbox_with_no_mail:**Berhasil keluar dari voice**");
      }

        if (lang == 'english' || lang == undefined) {
          if (!message.member.voice.channel) return message.channel.send("You are not in a voice channel!");
        const voiceChannel = message.member.voice.channel;
          if (queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id)
           return message.channel.send(`You must be in **${queue.get(message.guild.id).voiceChannel.name}** to disconnecting bot!`);
           message.member.voice.channel.leave();
           await queue.delete(message.guild.id);
           serverQueue.broadcast.dispatcher.end();
           return message.channel.send(":mailbox_with_no_mail:**Successfully disconnected**");
      }
    } catch (e) {
      console.log(e);
    }

  }
}