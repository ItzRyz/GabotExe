//const cfg = require("../config.json");
const Discord = require('discord.js');
const key = process.env.YT_API;
const fs = require("fs");
const moment = require("moment");
const yt = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(key);
const opus = require("opusscript");
const gyp = require("node-gyp");
const db = require("quick.db");

module.exports = {
    name: "search",
    aliases: ["sea", "se"],
    category: "music",
    description: "Search your song",
    usage: "[search | <title or url from youtube> ]",
    run: async (client, message, args, color, queue) => {
      
  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
      let lang = await client.bhs.fetch(`${message.guild.id}.lang.bhs`)

const voiceChannel = message.member.voice.channel;
      try {
        
         if (lang == 'indonesia') {
           if(message.guild.members.cache.get(message.author.id).voice.selfDeaf == true) return message.channel.send("Saya tidak dapat memutar music jika kamu deafend!") 
           if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`Kamu harus berada do saluran **${queue.get(message.guild.id).voiceChannel.name}** untuk memutar music`);
         }
           
         if (lang == 'english' || lang == undefined) {
           if(message.guild.members.cache.get(message.author.id).voice.selfDeaf == true) return message.channel.send("I can not play music if you deafend!")
      if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`You must be in **${queue.get(message.guild.id).voiceChannel.name}** to play music`);
         }
     } catch (e) {
        return null
      }
      
      if (lang == 'indonesia') {
      
       if (!voiceChannel) return message.channel.send('Maaf, anda harus masuk ke voice channel terlebih dahulu!');
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) {
      return message.channel.send('Saya tidak dapat berbicara di saluran suara ini, pastikan saya memiliki izin yang tepat!');
    } 
    if (!permissions.has('SPEAK')) {
      return message.channel.send('Saya tidak dapat berbicara di saluran suara ini, pastikan saya memiliki izin yang tepat!');
    }
      if (!searchString) return message.channel.send('Tolong gunakan : play <judul atau link dari youtube>')
      
      }
      
      if (lang == 'english' || lang == undefined) {
      
        if (!voiceChannel) return message.channel.send('Sorry, you must be on the voice channel to play music!');
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) {
      return message.channel.send('I can t speak on this voice channel, make sure I have the right permission!');
    } 
    if (!permissions.has('SPEAK')) {
      return message.channel.send('I can t speak on this voice channel, make sure I have the right permission!');
    }
      if (!searchString) return message.channel.send('Please Use : play <title or url from youtube>')
        
      }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 5);
          let index = 0;
          
          if (lang == 'indonesia') {
            const embed = new Discord.MessageEmbed()
          .setAuthor(" Pemilihan Lagu ", message.author.displayAvatarURL())
          .setDescription(`${videos.map(video2 => `**「${++index}」** \`${video2.title}\` `).join('\n')}`)
.setColor(client.color)
          .setFooter("Pilih nomer sesuai nomer lagu yang kalian cari mulai dari 1-5")
          
          let msgtoDelete = await message.channel.send(embed);    
                               
       await msgtoDelete.react("1️⃣");
       await msgtoDelete.react("2️⃣");
       await msgtoDelete.react("3️⃣");
       await msgtoDelete.react("4️⃣");
       await msgtoDelete.react("5️⃣");
       await msgtoDelete.react("🗑️");
            
          // eslint-disable-next-line max-depth
          try {
            // var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
            //   max: 1,
            //   time: 10000,
            //   errors: ['time']
            // });

    const filter =(rect, usr) => ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '🗑️'].includes(rect.emoji.name) && usr.id === message.author.id;
        var response = await msgtoDelete.awaitReactions(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
        });
            
            msgtoDelete.delete();
            } catch (err) {
              msgtoDelete.delete();
           const noPick = new Discord.MessageEmbed()
            .setDescription("Nilai yang hilang atau nilai yang dimasukkan, batalkan pilihan lagu.")
            .setColor(client.color)
           return message.channel.send(noPick).then(a => a.delete({timeout: 5000}))
            return;
          }}
            
            if (lang == 'english' || lang == undefined) {
          const embed = new Discord.MessageEmbed()
          .setTitle("🚀 Song Selection 🚀")
          .setDescription(`${videos.map(video2 => `**「${++index}」** \`${video2.title}\` `).join('\n')}`)
.setColor(client.color)
          .setFooter("Select the appropriate number song number that you are looking from 1-5")
          
          //message.react("🆗")
          let msgtoDelete = await message.channel.send(embed);    
                               
       await msgtoDelete.react("1️⃣");
       await msgtoDelete.react("2️⃣");
       await msgtoDelete.react("3️⃣");
       await msgtoDelete.react("4️⃣");
       await msgtoDelete.react("5️⃣");
       await msgtoDelete.react("🗑️");
              
          // eslint-disable-next-line max-depth
          try {
            const filter =(rect, usr) => ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '🗑️'].includes(rect.emoji.name) && usr.id === message.author.id;
        var response = await msgtoDelete.awaitReactions(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
        });
            
            msgtoDelete.delete();
          } catch (err) {
            const noPick = new Discord.MessageEmbed()
            .setDescription("Missing value or entered value, unselect song.")
.setColor("#f82929")
            return message.channel.send(noPick).then(a => a.delete(5000))
            msgtoDelete.delete();
            return;
          }}           
            
          const emoji = response.first().emoji.name;
        if(emoji === '1️⃣') index+1;
        if(emoji === '2️⃣') index+2
        if(emoji === '3️⃣') index+3;
        if(emoji === '4️⃣') index+4;
        if(emoji === '5️⃣') index+5;
          if (lang == 'indonesia') {
        if(emoji === '🗑️') return undefined, message.channel.send({embed: {description: "<a:noting:689139705094078545> Kamu membatalkan pencarian", color: client.color}});
          }
          if (lang == 'english') {
        if(emoji === '🗑️') return undefined, message.channel.send({embed: {description: "<a:noting:689139705094078545> You cancel a search", color: client.color}});  
          }
            
          const videoIndex = parseInt(emoji);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          
          if (lang == 'indonesia') {
          
          return message.channel.send('🆘 maaf saya tidak bisa mendapatkan hasil pencarian apapun.');
            
          }
          
          if (lang == 'english' || lang == undefined) {
          
          return message.channel.send('🆘 sorry I could not get any results.');
        }} 
      }
      return handleVideo(video, message, voiceChannel);
    }

    // Time for the functions

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  //console.log(video);
  const song = {
    id: video.id,
     title: Discord.Util.escapeMarkdown(video.title),
     url: `https://www.youtube.com/watch?v=${video.id}`,
     uploadedby: video.channel.title,
     channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
     durationh: video.duration.hours,
     durationm: video.duration.minutes,
     durations: video.duration.seconds,
     request: message.author,
     channels: voiceChannel.name,
  };
  if (!serverQueue) {
    const queueConstruct = { 
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      skippers: [],
      songs: [],
      volume: 100,
      playing: true,
      loop: false,
      bassbosst: false
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var broadcast = await voiceChannel.join();
      queueConstruct.broadcast = broadcast;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      if (lang == 'indonesia') {
      return message.channel.send(`Saya tidak bisa masuk ke dalam saluran suara: ${error}`);
      }
      
      if (lang == 'english' || lang == undefined) {
      return message.channel.send(`I could not join the voice channel: ${error}`);
      }
    }
  } else {
    serverQueue.songs.push(song);
    //console.log(serverQueue.songs);
    if (lang == 'indonesia') {
      
      const Jam =
      serverQueue.songs[0].durationh < 10
      ? `0${serverQueue.songs[0].durationh}`
      : serverQueue.songs[0].durationh;
    const Menit =
      serverQueue.songs[0].durationm < 10
        ? `0${serverQueue.songs[0].durationm}`
        : serverQueue.songs[0].durationm;
    const Detik =
      serverQueue.songs[0].durations < 10
        ? `0${serverQueue.songs[0].durations}`
        : serverQueue.songs[0].durations;
      
      let i = 0
      let p = db.add(`${message.guild.id}.queue.nomer`, 1)
      let posisi = db.get(`${message.guild.id}.queue.nomer`)
      
      let embed = new Discord.MessageEmbed()
  .setAuthor(`Ditambahkan Ke Antrian`, message.author.displayAvatarURL())
  .setDescription(`<:yutub:674634802539921419>\nJudul Lagu » [__**${song.title}**__](${song.url})`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=120&height=90`)
  .addField(`Durasi`, `[${Jam}:${Menit}:${Detik}]`, true)
  .addField(`Saluran`, `${song.channels}`, true)
  .addField(`Nomor Antrian`, posisi, true)
  .setColor(color)
      
    if (playlist) return undefined;
    else return await message.channel.send(embed);
    
  } 
    
    if (lang == 'english' || lang == undefined) {
    const Jam =
      serverQueue.songs[0].durationh < 10
      ? `0${serverQueue.songs[0].durationh}`
      : serverQueue.songs[0].durationh;
    const Menit =
      serverQueue.songs[0].durationm < 10
        ? `0${serverQueue.songs[0].durationm}`
        : serverQueue.songs[0].durationm;
    const Detik =
      serverQueue.songs[0].durations < 10
        ? `0${serverQueue.songs[0].durations}`
        : serverQueue.songs[0].durations;
      
      let i = 0
      let p = db.add(`${message.guild.id}.queue.nomer`, 1)
      let posisi = db.get(`${message.guild.id}.queue.nomer`)
      
      let embed = new Discord.MessageEmbed()
  .setAuthor(`Added To Queue`, message.author.displayAvatarURL())
  .setDescription(`<:yutub:674634802539921419>\nSong Title » [__**${song.title}**__](${song.url})`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=120&height=90`)
  .addField(`Duration`, `[${Jam}:${Menit}:${Detik}]`, true)
  .addField(`VoiceChannel`, `${song.channels}`, true)
  .addField(`Queue Number`, posisi, true)
  .setColor(color)
    if (playlist) return undefined;
    else return await message.channel.send(embed);
    
  }
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  try {
  
 if (!song) {
      setTimeout(() => {
    serverQueue.voiceChannel.leave()
         }, 1800000)
    queue.delete(guild.id);
    return;
  }
    
  } catch (e) {
    return null
  }
    
  //console.log(serverQueue.songs);

const dispatcher = serverQueue.broadcast.play(yt(song.url, { 
         filter: 'audioonly', 
         highWaterMark: 1<<25, 
         volume: 100,
         quality: 'highestaudio', 
         bitrate: 384,
         type: opus
})).on('finish', reason => {
            if (reason === 'Stream is not generating quickly enough.');
              //console.log(reason);
        if(serverQueue.loop === false) {
          serverQueue.songs.shift()
        } else if(serverQueue.loop === true) {
          const shifed = serverQueue.songs.unshift()
          if(serverQueue.loop === true) serverQueue.songs.push(shifed)
          serverQueue.songs.splice(shifed)
        } else if(serverQueue.loop === 1) {
          const shifed = serverQueue.songs.shift()
          if(serverQueue.loop === 1) serverQueue.songs.push(shifed)
        }
            setTimeout(() => {
                play(guild, serverQueue.songs[0]);
            }, 2000);
          return undefined
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

    //Modified playing messages that give you the song duration!

     const Jam =
      serverQueue.songs[0].durationh < 10
      ? `0${serverQueue.songs[0].durationh}`
      : serverQueue.songs[0].durationh;
    const Menit =
      serverQueue.songs[0].durationm < 10
        ? `0${serverQueue.songs[0].durationm}`
        : serverQueue.songs[0].durationm;
    const Detik =
      serverQueue.songs[0].durations < 10
        ? `0${serverQueue.songs[0].durations}`
        : serverQueue.songs[0].durations;
  
  if (lang == 'indonesia') {
    
  let embed = new Discord.MessageEmbed()
  .setDescription(`<:yutub:674634802539921419> **Memutar**\nJudul Lagu » [__**${song.title}**__](${song.url})`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=120&height=90`)
  .addField(`Durasi`, `[${Jam}:${Menit}:${Detik}]`, true)
  .addField(`Saluran`, `${song.channels}`, true)
  .addField(`Volume`, serverQueue.volume, true)
  .setColor(color)
  
if (serverQueue.loop == false) {
 return serverQueue.textChannel.send(embed);

} else if (serverQueue.loop == 1 || serverQueue.loop == true) return null 
    
  }
    

  if (lang == 'english' || lang == undefined) {
    
    let embed = new Discord.MessageEmbed()
  .setDescription(`<:yutub:674634802539921419>\nSong Title » [__**${song.title}**__](${song.url})`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=120&height=90`)
  .addField(`Duration`, `[${Jam}:${Menit}:${Detik}]`, true)
  .addField(`VoiceChannel`, `${song.channels}`, true)
  .addField(`Volume`, serverQueue.volume, true)
  .setColor(color)
    
if(serverQueue.loop == false) {
 return serverQueue.textChannel.send(embed);
} else
        if (serverQueue.loop == 1 || serverQueue.loop == true) return null 
  }
}
} // I had this setup somewhere else so if u see me paste something in that's why
}//const cfg = require("../config.json");