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
    name: "skip",
    aliases: ["s"],
    category: "music",
    description: "Skip your song",
    run: async (client, message, args, color, queue) => {
      
	  const serverQueue = queue.get(message.guild.id);
    let lang = await client.bhs.fetch(`${message.guild.id}.lang.bhs`)
        
    if (lang == 'indonesia') {
        
    const voiceChannel = message.member.voice.channel;
      if(serverQueue && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`Kamu harus berada di saluran **${queue.get(message.guild.id).voiceChannel.name}** untuk melewati musik`);
      if (!voiceChannel) return message.channel.send ('Maaf, kamu harus ada di dalam saluran suara untuk melewati musik!');
      if (!serverQueue) return message.channel.send("Tidak ada permainan yang bisa saya lewati untuk Anda.");
        serverQueue.broadcast.dispatcher.end(); 
        return message.channel.send(`⏩ _**Berhasil Melewati**_`);
        
    }
        
        
        if (lang == 'english' || lang == undefined) {
        
    const voiceChannel = message.member.voice.channel;
      if(serverQueue && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`You must be in **${queue.get(message.guild.id).voiceChannel.name}** to skip music`);
      if (!voiceChannel) return message.channel.send ('Sorry, you must be on the voice channel to skip music!');
      if (!serverQueue) return message.channel.send("There is nothing playing that I could skip for you.");
       serverQueue.broadcast.dispatcher.end();
       return message.channel.send(`⏩ _**Skipped**_`);
   }
        
}}