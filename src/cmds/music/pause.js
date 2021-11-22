//const prefixes = require("../prefixes.json");
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
    name: "pause",
    category: "music",
    description: "Pause your song",
    //usage: "[play | <title or url from youtube> ]",
    run: async (client, message, args, color, queue) => {
      
    const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
      let lang = await db.fetch(`${message.guild.id}.lang.bhs`)
      
      if (lang == true) {
       const voiceChannel = message.member.voice.channel;
      if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`Kamu harus berada di saluran **${queue.get(message.guild.id).voiceChannel.name}** untuk menjeda musik`);
if (!voiceChannel) return message.channel.send ('Maaf, kamu harus ada di dalam saluran suara untuk menjeda musik!');
if (!serverQueue) return message.channel.send("Tidak ada permainan yang bisa saya jeda untuk Anda.");
if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.broadcast.dispatcher.pause();
			return message.channel.send(`⏸ Musik di jeda oleh **${message.author.tag}**!`);
		}
		// return message.channel.send('There is nothing playing.');
      }
      
       if (lang == false || lang == undefined) {
        
      const voiceChannel = message.member.voice.channel;
      if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`You must be in **${queue.get(message.guild.id).voiceChannel.name}** to pause music`);
if (!voiceChannel) return message.channel.send ('Sorry, you must be on the voice channel to pause music!');
if (!serverQueue) return message.channel.send("There is nothing playing that I could pause for you.");
         if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.broadcast.dispatcher.pause();
			return message.channel.send(`⏸ Music paused by **${message.author.tag}**!`);
		}
       }

    // Time for the functions

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  console.log(video);
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
      volume: 5,
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
    console.log(serverQueue.songs);
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
  console.log(serverQueue.songs);

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
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}
}
}