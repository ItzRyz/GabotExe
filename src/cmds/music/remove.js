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
const config = require('../../data/config.json')

module.exports = {
    name: "remove",
    aliases: ["rm", "rem", "r"],
    category: "music",
    description: "remove your song queue",
    run: async (client, message, args, color, queue) => {
      
    const args1 = message.content.split(' ');
	const searchString = args1.slice(1).join(' ');
	const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);
      let lang = await client.bhs.fetch(`${message.guild.id}.lang.bhs`)
      let p = await db.fetch(`${message.guild.id}.prefix.prefixes`)
      if (!p) {
        p = config.prefix
      }

      try {
        
        if (lang == 'indonesia') {
        
      const voiceChannel = message.member.voice.channel;
      if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`Kamu harus berada di saluran **${queue.get(message.guild.id).voiceChannel.name}** untuk menghapus antrian musik`);
if (!voiceChannel) return message.channel.send ('Maaf, kamu harus ada di dalam saluran suara untuk menghapus antrian musik!');
if (!serverQueue) return message.channel.send("Tidak ada antrian yang bisa saya hapus untuk Anda.")
          let asu = args[0]
          if(!asu) return message.channel.send(`Tolong gunakan ${p}remove <nomer>\nNomer musik bisa kamu cek di ${p}queue`)
       const song = serverQueue.songs.splice(asu, 1);
    serverQueue.textChannel.send(`**${message.author}, Berhasil ❌ Menghapus **${song[0].title}** dari daftar antrian.**`);
return undefined;
        }
      
        if (lang == 'english' || lang == undefined) {
      const voiceChannel = message.member.voiceChannel;
      if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`You must be in **${queue.get(message.guild.id).voiceChannel.name}** to remove queue`);
     if (!message.member.voiceChannel) return message.channel.send ('Sorry, you must be on the voice channel to play music!');
if (!serverQueue) return message.channel.send("There is nothing playing that I could remove queue for you.");
          let asu = args[0]        
          if(!asu) return message.channel.send(`Please usage ${p}remove <number>\nYour music number can check in ${p}queue`)
       const song = serverQueue.songs.splice(asu, 1);
    serverQueue.textChannel.send(`**${message.author}, Succesfully ❌ removed **${song[0].title}** from the queue.**`);
return undefined;
        }
        
      } catch (e) {
        return null
      }

    // Time for the functions
    async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  //console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      skippers: [],
      songs: [],
      volume: 100,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    //console.log(serverQueue.songs);
    if (playlist) return undefined;
    else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  //console.log(serverQueue.songs);

const dispatcher = serverQueue.connection.playStream(yt(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            setTimeout(() => {
                play(guild, serverQueue.songs[0]);
            }, 250);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

    serverQueue.textChannel.send(`🎶 Memutar: **${song.title}**`);
}
}}