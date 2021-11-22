//const cfg = require("../config.json");
const Discord = require("discord.js");
const key = process.env.YT_API;
const fs = require("fs"); 
const moment = require('moment');
const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(key);
const opus = require("opusscript");
const gyp = require("node-gyp");
const db = require("quick.db");

module.exports = {
    name: "volume",
    aliases: ["v"],
    category: "music",
    description: "To adjust the sound of your music",
    usage: "[volume | <new volume>]",
    run: async (client, message, args, color, queue) => {
      
    const args1 = message.content.split(' ');
    const serverQueue = queue.get(message.guild.id); 
      let lang = await db.fetch(`${message.guild.id}.lang.bhs`)
  
      if (lang == 'indonesia') {
      const voiceChannel = message.member.voice.channel;
      if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`Kamu harus berada di saluran **${queue.get(message.guild.id).voiceChannel.name}** untuk mengubah suara musik`);
    if (!serverQueue) return message.channel.send("Tidak ada permainan yang bisa saya ubah suaranya untuk Anda.");
		if (!args1[1]) return message.channel.send(`Suara saat ini » **${serverQueue.volume}%**`);
      }
      
      if (lang == 'english' || lang == undefined) {
      const voiceChannel = message.member.voice.channel;
      if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`You must be in **${queue.get(message.guild.id).voiceChannel.name}** to set volume music`);
    if (!serverQueue) return message.channel.send("There is nothing playing that I could changed it volume for you.");
		if (!args1[1]) return message.channel.send(`The current volume is » **${serverQueue.volume}%**`);
      }
        
      try {
         if (lang == 'indonesia') {
            if (args1[1] > 200) {
              return message.reply("Kuping kamu akan rusak!")
            }
         }
            if (lang == 'english' || lang == undefined) {
    if (args1[1] > 200) {
      return message.reply("Your ears will be damaged!")
    }
            }
      } catch (e) {
        return null
      }
      
      if (lang == 'indonesia') {
        await serverQueue.broadcast.dispatcher.setVolumeLogarithmic(args1[1] / 200)
        serverQueue.volume = args1[1]
        return message.channel.send(`<a:vol:871898693454938172> | Saya mengubah suara menjadi » **${args1[1]}%**`);
      }
      
      if (lang == 'english' || lang == undefined) {
        await serverQueue.broadcast.dispatcher.setVolumeLogarithmic(args1[1] / 200)
        serverQueue.volume = args1[1]
        return message.channel.send(`<a:vol:871898693454938172> | I set the volume to » **${args1[1]}%**`);
      }
        
}
}