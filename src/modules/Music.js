const Discord = require("discord.js");
const ytdl = require("discord-ytdl-core");
const db = require("quick.db")

      let NIGHTCORE = [
   "-af",
   "asetrate=44100*1.6,aresample=44100,equalizer=f=40:width_type=h:width=50:g=10"
 ];
 let ECHO = ["-af", "aecho=0.6:0.3:1000:0.5"];

class Music {
  constructor(client) {
    this.client = client;
  }

  
  async handleVideo(video, message, voiceChannel, playlist = false, skip) {
    let lang = await this.client.bhs.fetch(`${message.guild.id}.lang.bhs`)
    const serverQueue = this.client.queue.get(message.guild.id);
    const song = {
     id: video.id,
     title: Discord.Util.escapeMarkdown(video.title),
     url: `https://www.youtube.com/watch?v=${video.id}`,
     uploadedby: video.channel.title,
     channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
     duration: video.duration,
     duration2:
        video.duration.hours * 3.6e6 +
        video.duration.minutes * 60000 +
        video.duration.seconds * 1000,
     request: message.author,
     requestedAt: new Date(),
     channels: voiceChannel.name,
     streamTime: 0
    };
    if (!serverQueue) {
      const queueConstruct = {
       textChannel: message.channel,
      voiceChannel: voiceChannel,
      broadcast: null,
      skippers: [],
      songs: [],
      volume: 100,
      playing: true,
      loop: false,
      bassboost: 0
      };
      this.client.queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var broadcast = await voiceChannel.join();
        queueConstruct.broadcast = broadcast;
        await this.play(message.guild, queueConstruct.songs[0], skip, true);
      } catch (error) {
          console.error(`I could not join the voice channel: ${error}`);
      this.client.queue.delete(message.guild.id);
      
      if (lang == 'indonesia') {
      return message.channel.send(`Saya tidak bisa masuk ke dalam saluran suara: ${error}`);
      }
      
      if (lang == 'english' || lang == undefined) {
      return message.channel.send(`I could not join the voice channel: ${error}`);
      }
    }
    } else {
      serverQueue.songs.push(song);
        if (lang == 'indonesia') {

      let embed = new Discord.MessageEmbed()
  .setAuthor(`Ditambahkan Ke Antrian`, message.author.displayAvatarURL())
  .setDescription(`<:yutub:871898692913885194> Judul Lagu » [__**${song.title}**__](${song.url})`)
  .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
  .addField(`Durasi`, `[${song.duration.hours}:${song.duration.minutes}:${song.duration.seconds}]`, true)
  .addField(`Saluran`, `${song.channels}`, true)
  //.addField(`Nomor Antrian`, posisi, true)
  .setColor(this.client.color)
      
    if (playlist) return undefined;      
    else return message.channel.send(embed);
    
  } 
    
    if (lang == 'english' || lang == undefined) {
      
      let embed = new Discord.MessageEmbed()
  .setAuthor(`Added To Queue`, message.author.displayAvatarURL())
  .setDescription(`<:yutub:871898692913885194> Song Title » [__**${song.title}**__](${song.url})`)
  .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
  .addField(`Duration`, `[${song.duration.hours}:${song.duration.minutes}:${song.duration.seconds}]`, true)
  .addField(`VoiceChannel`, `${song.channels}`, true)
  //.addField(`Queue Number`, posisi, true)
  .setColor(this.client.color)
    if (playlist) return;
    else return await message.channel.send(embed);
    }
  }
  
  return;
    }

  async play(guild, song, skip = 0, first = false) {
    const serverQueue = this.client.queue.get(guild.id);
    if (!guild.me.voice.channel) {
      this.client.queue.delete(guild.id);
    }
    
   if (!song) {
    this.client.queue.delete(guild.id);
    serverQueue.voiceChannel.leave();
    return serverQueue.textChannel.send('This music has ended!');
  }
    try {
    serverQueue.songs[0].streamTime = serverQueue.songs[0].streamTime + skip; // update frame position
    const dispatcher = ytdl(song.url, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1024 * 1024 * 10,
      seek: skip / 1000,
      bitrate: 512,
      opusEncoded: true,
      encoderArgs:["-af", `equalizer=f=40:width_type=h:width=50:g=${serverQueue.bassboost},dynaudnorm=f=95`]});
    
     const tream = serverQueue.broadcast.play(dispatcher, {
        type: "opus",
        highWaterMark: 1,
        volume: serverQueue.volume / 200
      })
      .on("finish", reason => {
        if(serverQueue.loop === false) {
          serverQueue.songs.shift()
        } else if(serverQueue.loop === 'song') {
          serverQueue.songs[0].streamTime = 0;
          const shifed = serverQueue.songs.unshift()
          if(serverQueue.loop === 'song') serverQueue.songs.push(shifed)
          serverQueue.songs.splice(shifed)
        } else if(serverQueue.loop === 'all') {
          serverQueue.songs[0].streamTime = 0;
          const shifed = serverQueue.songs.shift()
          if(serverQueue.loop === 'all') serverQueue.songs.push(shifed)
        }

                setTimeout(() => {
                this.play(guild, serverQueue.songs[0]);
            }, 500);
          return undefined
        
      })
      .on("error", error => console.error(error));
    serverQueue.broadcast.dispatcher.setVolumeLogarithmic(serverQueue.volume / 200);
    serverQueue.dispatcher = tream;
      
      } catch (e) {
  console.log(e)
}

  let lang = await this.client.bhs.fetch(`${guild.id}.lang.bhs`)
  if (lang == 'indonesia') {
    
  let embed = new Discord.MessageEmbed()
  .setDescription(`<:yutub:871898692913885194> **Memutar**\nJudul Lagu » [__**${song.title}**__](${song.url})`)
  .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
  .addField(`Durasi`, `[${song.duration.hours}:${song.duration.minutes}:${song.duration.seconds}]`, true)
  .addField(`Saluran`, `${song.channels}`, true)
  .addField(`Volume`, serverQueue.volume, true)
  .setColor(this.client.color)
  
if (serverQueue.loop == false || serverQueue.loop == 'all') {
if (first) return serverQueue.textChannel.send(embed).catch(e => {});

} else if (serverQueue.loop == 'song') return null;
    
  }
    

  if (lang == 'english' || lang == undefined) {
    
    let embed = new Discord.MessageEmbed()
  .setDescription(`<:yutub:871898692913885194>\nSong Title » [__**${song.title}**__](${song.url})`)
  .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
  .addField(`Duration`, `[${song.duration.hours}:${song.duration.minutes}:${song.duration.seconds}]`, true)
  .addField(`VoiceChannel`, `${song.channels}`, true)
  .addField(`Volume`, serverQueue.volume, true)
  .setColor(this.client.color)
    
if(serverQueue.loop == false || serverQueue.loop == 'all') {
if (first) return serverQueue.textChannel.send(embed).catch(e => {});
} else if (serverQueue.loop == 'song') return null;
 }
  
  }
  
  createBar(shifted, total) {
    let indicator = "🔘";
    let index = Math.round((shifted / total) * 15);
    if (index >= 1 && index <= 15) {
      let bar = `▬▬▬▬▬▬▬▬▬▬▬▬▬▬`.split("");
      bar.insert(index, indicator).catch(e => {
        console.log(e.message)
      })
      return bar.join("");
    } else {
      return `${indicator}▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
    }
  }
}
  
module.exports = Music;