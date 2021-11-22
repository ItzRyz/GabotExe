/*//const cfg = require("../config.json");
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
const skip = 0;

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "music",
    description: "To see the music that is playing",
    run: async (client, message, args, color, queue) => {
      
  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  let lang = await db.fetch(`${message.guild.id}.lang.bhs`)
  
  const duration =
      serverQueue.songs[0].durationh * 3.6e6 +
      (serverQueue.songs[0].durationm * 60000) +
      (serverQueue.songs[0].durations % 60000) * 1000;
    const persentase = serverQueue.broadcast.dispatcher.streamTime / duration;
    const curentDurationHours = 
           Math.floor(serverQueue.broadcast.dispatcher.streamTime / 3.6e6) < 10
    ? `0${Math.floor(serverQueue.broadcast.dispatcher.streamTime / 3.6e6)}`
        : Math.floor(serverQueue.broadcast.dispatcher.streamTime / 3.6e6);
    const curentDurationMinute =
      Math.floor(serverQueue.broadcast.dispatcher.streamTime / 60000) < 10
        ? `0${Math.floor(serverQueue.broadcast.dispatcher.streamTime / 60000)}`
        : Math.floor(serverQueue.broadcast.dispatcher.streamTime / 60000);
    const currentDurationSeconds =
      Math.floor(
        (serverQueue.broadcast.dispatcher.streamTime % 60000) / 1000) < 10
        ? `0${Math.floor((serverQueue.broadcast.dispatcher.streamTime % 60000) / 1000)}`: Math.floor((serverQueue.broadcast.dispatcher.streamTime % 60000) / 1000);

    const endDurationHour =
      serverQueue.songs[0].durationh < 10
      ? `0${serverQueue.songs[0].durationh}`
      : serverQueue.songs[0].durationh;
    const endDurationMinute =
      serverQueue.songs[0].durationm < 10
        ? `0${serverQueue.songs[0].durationm}`
        : serverQueue.songs[0].durationm;
    const endDurationSeconds =
      serverQueue.songs[0].durations < 10
        ? `0${serverQueue.songs[0].durations}`
        : serverQueue.songs[0].durations;
      
      let playing = serverQueue.playing
      
      if (playing == true) {
        playing = '▶'
      }
      
      if (playing == false) {
        playing = '⏸'
      }
      
     if (curentDurationHours == NaN) {
         curentDurationHours = '0'
       }
      
     if (curentDurationMinute == 60) {
         curentDurationMinute == '0'
     }
      
  if (lang == true) {
    if (!serverQueue) return message.channel.send("Tidak Ada Yang Bermain Music")
  }
  
      if (lang == 'indonesia') {
      
  if (!serverQueue) return message.channel.send("No Music Playing");
        
      }
    
      const ServerQueue = queue.get(message.guild.id)
    // let embed = new Discord.MessageEmbed()
    // .setColor("AQUA")
    // .setDescription(`▶ ${progressBar(persentase)} \`[${curentDurationMinute}:${currentDurationSeconds} - ${endDurationMinute}:${endDurationSeconds}]\`\n\n🔊:notes: Sedang Di Putar: **${serverQueue.songs[0].title}**\n\nSuara : ${serverQueue.volume}%\n\nRequest By : ${serverQueue.songs[0].request}\n\nDurasi : ${serverQueue.songs[0].durationh}:${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`)
    // .setThumbnail(`https://i.ytimg.com/vi/${serverQueue.songs[0].id}/default.jpg?width=120&height=90`)
    // return message.channel.send(embed);

        const embed1 = new Discord.MessageEmbed()
        .setDescription(`<:yutub:871898692913885194> | Musik:\n__**[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**__\n${playing} ${progressBar(persentase)} \`[${curentDurationHours}:${curentDurationMinute}:${currentDurationSeconds} - ${endDurationHour}:${endDurationMinute}:${endDurationSeconds}]\``)
        .setThumbnail(`https://img.youtube.com/vi/${serverQueue.songs[0].id}/maxresdefault.jpg`)
        .addField(`Durasi`, `[${curentDurationHours}:${curentDurationMinute}:${currentDurationSeconds}]`, true)
        .addField(`Saluran`, `${serverQueue.songs[0].channels}`, true)
        .addField(`Volume`, serverQueue.volume, true)
        .setColor(color);
      message.channel.send(embed1)
    }
}
      
/*function progressBar(percent) {
  let num = Math.floor(percent * 13);
  if (num === 1) {
    return "█";
  } else if (num === 2) {
    return "██";
  } else if (num === 3) {
    return "███";
  } else if (num === 4) {
    return "████";
  } else if (num === 5) {
    return "█████";
  } else if (num === 6) {
    return "██████";
  } else if (num === 7) {
    return "███████";
  } else if (num === 8) {
    return "████████";
  } else if (num === 9) {
    return "█████████";
  } else if (num === 10) {
    return "██████████";
  } else if (num === 11) {
    return "███████████";
  } else if (num === 12) {
    return "████████████";
  } else if (num === 13) {
    return "█████████████";
  } else if (num === 14) {
    return "██████████████";
  } else if (num === 15) {
    return "███████████████";
  } else {
    return "█";
  }
}*/

/*
function progressBar(percent) {
  let num = Math.floor(percent * 13);
  if (num === 1) {
    return "🧿██████████████";
  } else if (num === 2) {
    return "█🧿█████████████";
  } else if (num === 3) {
    return "██🧿████████████";
  } else if (num === 4) {
    return "███🧿███████████";
  } else if (num === 5) {
    return "████🧿██████████";
  } else if (num === 6) {
    return "█████🧿█████████";
  } else if (num === 7) {
    return "██████🧿████████";
  } else if (num === 8) {
    return "███████🧿███████";
  } else if (num === 9) {
    return "████████🧿██████";
  } else if (num === 10) {
    return "█████████🧿█████";
  } else if (num === 11) {
    return "██████████🧿████";
  } else if (num === 12) {
    return "███████████🧿███";
  } else if (num === 13) {
    return "████████████🧿██";
  } else if (num === 14) {
    return "█████████████🧿█";
  } else if (num === 15) {
    return "██████████████🧿";
  } else {
    return "🧿██████████████";
  }
}


function progressBar(percent) {
  let num = Math.floor(percent * 13);
  if (num === 1) {
    return "🧿▬▬▬▬▬▬▬▬▬▬▬▬▬▬";
  } else if (num === 2) {
    return "▬🧿▬▬▬▬▬▬▬▬▬▬▬▬▬";
  } else if (num === 3) {
    return "▬▬🧿▬▬▬▬▬▬▬▬▬▬▬▬";
  } else if (num === 4) {
    return "▬▬▬🧿▬▬▬▬▬▬▬▬▬▬▬";
  } else if (num === 5) {
    return "▬▬▬▬🧿▬▬▬▬▬▬▬▬▬▬";
  } else if (num === 6) {
    return "▬▬▬▬▬🧿▬▬▬▬▬▬▬▬▬";
  } else if (num === 7) {
    return "▬▬▬▬▬▬🧿▬▬▬▬▬▬▬▬";
  } else if (num === 8) {
    return "▬▬▬▬▬▬▬🧿▬▬▬▬▬▬▬";
  } else if (num === 9) {
    return "▬▬▬▬▬▬▬▬🧿▬▬▬▬▬▬";
  } else if (num === 10) {
    return "▬▬▬▬▬▬▬▬▬🧿▬▬▬▬▬";
  } else if (num === 11) {
    return "▬▬▬▬▬▬▬▬▬▬🧿▬▬▬▬";
  } else if (num === 12) {
    return "▬▬▬▬▬▬▬▬▬▬▬🧿▬▬▬";
  } else if (num === 13) {
    return "▬▬▬▬▬▬▬▬▬▬▬▬🧿▬▬";
  } else if (num === 14) {
    return "▬▬▬▬▬▬▬▬▬▬▬▬▬🧿▬";
  } else if (num === 15) {
    return "▬▬▬▬▬▬▬▬▬▬▬▬▬▬🧿";
  } else {
    return "🧿▬▬▬▬▬▬▬▬▬▬▬▬▬▬";
  }
}*/