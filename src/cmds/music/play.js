const Discord = require('discord.js');
const key = process.env.YT_API;
const fs = require("fs");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(key);
const opus = require("opusscript");
const gyp = require("node-gyp");
const db = require("quick.db");
const ytdl = require("discord-ytdl-core");


module.exports = {
    name: "play",
    aliases: ["p"],
    category: "music",
    description: "Play your song",
    usage: "[play | <title or url from youtube> ]",
    run: async (client, message, args, color) => {
      
  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = client.queue.get(message.guild.id);
  const queue = client.queue.get(message.guild.id);
  let lang = await client.bhs.fetch(`${message.guild.id}.lang.bhs`)
  
const voiceChannel = message.member.voice.channel;
      try {
        
         /*if (lang == 'indonesia') {
           if(serverQueue.playing == false)
         }*/
        
         if (lang == 'indonesia') {
        if(message.guild.members.cache.get(message.author.id).voice.selfDeaf == true) return message.channel.send({embed: {description : "Saya tidak dapat memutar music jika kamu deafend!", color: client.color}}) 
           if(client.queue.has(message.guild.id) && voiceChannel.id !== client.queue.get(message.guild.id).voiceChannel.id) return message.channel.send({embed: {description: `Kamu harus berada di saluran **${client.queue.get(message.guild.id).voiceChannel.name}** untuk memutar music`, color: client.color}});
         }
           
         if (lang == 'english' || lang == undefined) {
           if(message.guild.members.cache.get(message.author.id).voice.selfDeaf == true) return message.channel.send("I can not play music if you deafend!")
      if(client.queue.has(message.guild.id) && voiceChannel.id !== client.queue.get(message.guild.id).voiceChannel.id) return message.channel.send({embed: {description: `You must be in **${client.queue.get(message.guild.id).voiceChannel.name}** to play music`, color: client.color}});
         }
        
        
      if (lang == 'indonesia') {
      
       if (!voiceChannel) return message.channel.send({embed: {description: 'Maaf, kamu harus masuk ke voice channel terlebih dahulu!', color: client.color}});
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
     } catch (e) {
       console.log(e)
        return null
      }
      

    /*if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await client.player.handleVideo(video2, message, voiceChannel, true, 0); // eslint-disable-line no-await-in-loop
      }
      return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);*/
          if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
                const playlist = await youtube.getPlaylist(url).catch(erro => {
                    return message.reply("Daftar putar bersifat pribadi atau tidak ada!")
                });
                const videos = await playlist.getVideos().catch(erro => { 
                    message.reply("Terjadi masalah saat menempatkan salah satu video dari daftar putar dalam antrean!'")
                });
                for(const video of Object.values(videos)){
                    try{
                    const video2 = await youtube.getVideoByID(video.id)
                    await client.player.handleVideo(video2, message, voiceChannel, true)
                } catch {
                }
                }
                message.reply(`✅ Playlist: **${playlist.title}** has been added to the queue!`)
             
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 8);
          let index = 0;

          try {
            var response = await `1`
          } catch (err) {
            console.error(err);
            
            if (lang == 'indonesia') {
              
              const noPick = new Discord.MessageEmbed()
            .setDescription("Nilai yang hilang atau nilai yang dimasukkan, batalkan pilihan lagu.")
.setColor("#f82929")
           return message.channel.send({embed: noPick});
            return;
            
            }
              
            if (lang == 'english' || lang == undefined) {
            
            const noPick = new Discord.MessageEmbed()
            .setDescription("Missing value or entered value, unselect song.")
.setColor("#f82929")
            return message.channel.send({embed: noPick});
            return;
          }}
          
          if (lang == 'indonesia') {
          
          let sea = await message.channel.send(`<a:loding:871898692804833290> Mencari Lagu \`${searchString}\``)
          const videoIndex = await parseInt(response);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
          setTimeout(async () => {
          await sea.edit(`<:yutub:871898692913885194> Menemukan Lagu \`${searchString}\``)
          }, 2000);
          //play(this.client,queue, message.guild);
          }
          
          if (lang == 'english' || lang == undefined) {
          
          let embed = new Discord.MessageEmbed()
          .setDescription(`<a:loding:871898692804833290> Searching **${searchString}**`)
          .setColor(color)
          
          let sea = await message.channel.send(embed);
          const videoIndex = await parseInt(response);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
         setTimeout(() => {  
         sea.edit(`<:yutub:871898692913885194> Found a song \`${searchString}\``)
         }, 2000);
          }
            
        } catch (err) {
          console.error(err);
          
          if (lang == 'indonesia') {
          
          return message.channel.send('🆘 maaf saya tidak bisa mendapatkan hasil pencarian apapun.');
            
          }
          
          if (lang == 'english' || lang == undefined) {
          
          return message.channel.send('🆘 sorry I could not get any results.');
        }}
      }
      return client.player.handleVideo(video, message, voiceChannel, false, 0);
            
    }

} 
}