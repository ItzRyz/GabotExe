const Discord = require("discord.js");
const ytdl = require("discord-ytdl-core");
let NIGHTCORE = ["-af", "asetrate=44100*1.6,aresample=44100,equalizer=f=40:width_type=h:width=50:g=10"];
let ECHO = ["-af", "aecho=0.6:0.3:1000:0.5"];
const db = require("quick.db");

module.exports = {
    name: "bassbosst",
    aliases: ["bb"],
    category: "music",
    description: "To set your bass music",
    run: async (client, msg, args, color) => {
      
    const args1 = msg.content.split(' ')
    //const serverQueue = queue.get(msg.guild.id)
    let lang = await client.bhs.fetch(`${msg.guild.id}.lang.bhs`)
    let queue = client.queue.get(msg.guild.id);
    

      
      if (lang == 'indonesia') {
    let count = args1[1]
    if (!queue) return msg.channel.send("Aku tidak memutar lagu!");
    if (!msg.member.voice.channel) return msg.channel.send(`Anda tidak berada di saluran suara!`);
    if(!count) return msg.channel.send("Tolong berikan jumblah bas!")
    if (queue && msg.guild.me.voice.channel.id !== msg.member.voice.channel.id) return msg.channel.send(`Anda tidak ada di saluran suara saya!`);
    if(count > 60) return msg.channel.send("Bas tidak bisa melebihi dari 60!")
    
    
        let amt = args[0];
        
        queue.bassboost = amt;
        play(client, queue, msg.guild);
        return msg.channel.send(`<a:bass:871900696545484840> | Bas telah di ubah menjadi **${count}**`);
      }
      
      
      if (lang == 'english' || lang == undefined) {
        let count = args1[1]
    if (!queue) return msg.channel.send("I'm not playing a song!");
    if (!msg.member.voice.channel) return msg.channel.send(`You're not in a voice channel!`);
    if (queue && msg.guild.me.voice.channel.id !== msg.member.voice.channel.id) return msg.channel.send(`You're not in my voice channel!`);
    if(!count) return msg.channel.send("Please provide the number of bass!")
    if(count > 60) return msg.channel.send("Bass can not exceed 60!")
    
    
        let amt = args[0];
        
        queue.bassboost = amt;
        play(client, queue, msg.guild);
        return msg.channel.send(`<a:bass:871900696545484840> | Bass has been changed to **${count}**`);
        
        
      }
      
      
    }
}

function play(client, queue, server) {
  return client.player.play(server, queue.songs[0], queue.broadcast.dispatcher.streamTime);
}