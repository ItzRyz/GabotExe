const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "resume",
    category: "music",
    description: "Resume your song",
    run: async (client, message, args, color, queue) => {
      
  const serverQueue = queue.get(message.guild.id); 
  let lang = await db.fetch(`${message.guild.id}.lang.bhs`)
 
  if (lang == 'indonesia') {
       const voiceChannel = message.member.voice.channel;
      //if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`Kamu harus berada di saluran **${queue.get(message.guild.id).voiceChannel.name}** untuk menjeda musik`);
if (!voiceChannel) return message.channel.send ('Maaf, kamu harus ada di dalam saluran suara untuk melanjutkan musik!');
if (!serverQueue) return message.channel.send("Tidak ada permainan yang bisa saya lanjutkan untuk Anda.");
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.broadcast.dispatcher.resume();
      return message.channel.send(`▶️ Melanjutkan musik yang dijeda untuk Anda!`);
    }
  }
    
     if (lang == 'english' || lang == undefined) {
        
      const voiceChannel = message.member.voice.channel;
      //if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`You must be in **${queue.get(message.guild.id).voiceChannel.name}** to pause music`);
if (!voiceChannel) return message.channel.send ('Sorry, you must be on the voice channel to continuing music!');
if (!serverQueue) return message.channel.send("There is nothing playing that I could resume for you.");
 if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.broadcast.dispatcher.resume();
      return message.channel.send(`▶️ Continuing music that is paused for you!`);
    }
     }
    return undefined;

    }
}