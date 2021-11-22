//const cfg = require("../config.json");
const Discord = require('discord.js');
const key = process.env.YT_API;
const fs = require("fs");
const moment = require("moment");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(key);
const opus = require("opusscript");
const gyp = require("node-gyp");
const db = require("quick.db");

module.exports = {
    name: "loop",
    aliases: ["lo"],
    category: "music",
    description: "To repeat your music",
    run: async (client, msg, args, color, queue) => {
      
    const args1 = msg.content.split(' ')
    const searchString = args1.slice(1).join(' ');
    const url = args1[1] ? args1[1].replace(/<.+>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
      let lang = await client.bhs.fetch(`${msg.guild.id}.lang.bhs`)
       let opti = args.slice(0).join(' ')
  let optical = opti.toLocaleLowerCase()
  
  if (lang == 'indonesia') {
  if (serverQueue.loop == false || serverQueue.loop == undefined) {
  if (!serverQueue) return msg.channel.send({embed: {description : "Anda sedang tidak memutar musik!", color: client.color}})
  let a = new Discord.MessageEmbed()
  .setAuthor("Pilih salah 1 Loop", msg.author.displayAvatarURL())
  .setDescription("**[1]** Ulangi semua Musik!\n**[2]** Ulangi 1 Musik\n**[3]** Keluar Dari Pemilihan")
  .setColor(client.color)
  
  let mes = await msg.channel.send(a)
  
  await mes.react("1️⃣")
  await mes.react("2️⃣")
  await mes.react("❌")
    
    const filter =(rect, usr) => ['1️⃣', '2️⃣', '❌'].includes(rect.emoji.name) && usr.id === msg.author.id;
        var response = await mes.awaitReactions(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
        });
    
    const emoji = response.first().emoji.name;
        if(emoji === '1️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Mengulangi semua Musik!", color: client.color}}), serverQueue.loop = 'all')
        if(emoji === '2️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Mengulangi 1 Musik!", color: client.color}}), serverQueue.loop = 'song');
        if(emoji === '❌') mes.delete().then(async a => msg.channel.send({embed: {description: "Kamu Telah Keluar Dari Pemilihan Loop", color: client.color}}).then(x => x.delete({timeout: 3000})));
    return undefined
  }
      
  if (serverQueue.loop == 'all') {
   
    let a = new Discord.MessageEmbed()
  .setAuthor("Pilih salah 1 Loop", msg.author.displayAvatarURL())
  .setDescription("**[1]** Matikan Loop\n**[2]** Ulangi 1 Lagu\n**[3]** Keluar Dari Pemilihan")
  .setColor(client.color)
  
  let mes = await msg.channel.send(a)
  
  await mes.react("1️⃣")
  await mes.react("2️⃣")
  await mes.react("❌")
    
    const filter =(rect, usr) => ['1️⃣', '2️⃣', '❌'].includes(rect.emoji.name) && usr.id === msg.author.id;
        var response = await mes.awaitReactions(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
        });
    
    const emoji = response.first().emoji.name;
        if(emoji === '1️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Loop Dimatikan!", color: client.color}}), serverQueue.loop = false);
        if(emoji === '2️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Mengulangi 1 Lagu!", color: client.color}}), serverQueue.loop = 'song');
        if(emoji === '❌') mes.delete().then(async a => msg.channel.send({embed: {description: "Kamu Telah Keluar Dari Pemilihan Loop", color: client.color}}).then(x => x.delete({timeout: 3000})));
    return undefined
   }

      
      if (serverQueue.loop == 'song') {
   
    let a = new Discord.MessageEmbed()
  .setAuthor("Pilih salah 1 Loop", msg.author.displayAvatarURL())
  .setDescription("**[1]** Ulangi semua Lagu\n**[2]** Matikan Loop\n**[3]** Keluar Dari Pemilihan")
  .setColor(client.color)
  
  let mes = await msg.channel.send(a)
  
  await mes.react("1️⃣")
  await mes.react("2️⃣")
  await mes.react("❌")
    
    const filter =(rect, usr) => ['1️⃣', '2️⃣', '❌'].includes(rect.emoji.name) && usr.id === msg.author.id;
        var response = await mes.awaitReactions(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
        });
    
    const emoji = response.first().emoji.name;
        if(emoji === '1️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Mengulangi semua Lagu!", color: client.color}}), serverQueue.loop = 'all');
        if(emoji === '2️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Loop Dimatikan!", color: client.color}}), serverQueue.loop = false);
        if(emoji === '❌') mes.delete().then(async a => msg.channel.send({embed: {description: "Kamu Telah Keluar Dari Pemilihan Loop", color: client.color}}).then(x => x.delete({timeout: 3000})));
    return undefined
   }
  }
  
  if (lang == 'english' || lang == undefined) {
    
      if (serverQueue.loop == false || serverQueue.loop == undefined) {
  if (!serverQueue) return msg.channel.send({embed: {description : "You are not playing music!", color: client.color}})
  let a = new Discord.MessageEmbed()
  .setAuthor("Please choose 1 Loop", msg.author.displayAvatarURL())
  .setDescription("**[1]** Repeat all song!\n**[2]** Repeat 1 song\n**[3]** Exit selection")
  .setColor(client.color)
  
  let mes = await msg.channel.send(a)
  
  await mes.react("1️⃣")
  await mes.react("2️⃣")
  await mes.react("❌")
    
    const filter =(rect, usr) => ['1️⃣', '2️⃣', '❌'].includes(rect.emoji.name) && usr.id === msg.author.id;
        var response = await mes.awaitReactions(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
        });
    
    const emoji = response.first().emoji.name;
        if(emoji === '1️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Mengulangi semua Musik!", color: client.color}}), serverQueue.loop = 'all')
        if(emoji === '2️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Mengulangi 1 Musik!", color: client.color}}), serverQueue.loop = 'song');
        if(emoji === '❌') mes.delete().then(async a => msg.channel.send({embed: {description: "Kamu Telah Keluar Dari Pemilihan Loop", color: client.color}}).then(x => x.delete({timeout: 3000})));
    return undefined
  }
    
      if (serverQueue.loop == 'all') {
   
    let a = new Discord.MessageEmbed()
  .setAuthor("Please choose 1 Loop", msg.author.displayAvatarURL())
  .setDescription("**[1]** Turn off repeat\n**[2]** Repeat 1 song\n**[3]** Exit selection")
  .setColor(client.color)
  
  let mes = await msg.channel.send(a)
  
  await mes.react("1️⃣")
  await mes.react("2️⃣")
  await mes.react("❌")
    
    const filter =(rect, usr) => ['1️⃣', '2️⃣', '❌'].includes(rect.emoji.name) && usr.id === msg.author.id;
        var response = await mes.awaitReactions(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
        });
    
    const emoji = response.first().emoji.name;
        if(emoji === '1️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Loop is turned off!", color: client.color}}), serverQueue.loop = false);
        if(emoji === '2️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Repeat 1 Song!", color: client.color}}), serverQueue.loop = 'song');
        if(emoji === '❌') mes.delete().then(async a => msg.channel.send({embed: {description: "You have exited the selection Loop", color: client.color}}).then(x => x.delete({timeout: 3000})));
    return undefined
   }
    
    if (serverQueue.loop == 'song') {
    
  let a = new Discord.MessageEmbed()
  .setAuthor("Please choose 1 Loop", msg.author.displayAvatarURL())
  .setDescription("**[1]** Repeat all song\n**[2]** Turn off repeat\n**[3]** Exit selection")
  .setColor(client.color)
  
  let mes = await msg.channel.send(a)
  
  await mes.react("1️⃣")
  await mes.react("2️⃣")
  await mes.react("❌")
    
    const filter =(rect, usr) => ['1️⃣', '2️⃣', '❌'].includes(rect.emoji.name) && usr.id === msg.author.id;
        var response = await mes.awaitReactions(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
        });
    
    const emoji = response.first().emoji.name;
        if(emoji === '1️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Repeat all songs!", color: client.color}}), serverQueue.loop = 'all');
        if(emoji === '2️⃣') mes.delete().then(async a => msg.channel.send({embed: {description: ":repeat: Loop is turned off!", color: client.color}}), serverQueue.loop = false);
        if(emoji === '❌') mes.delete().then(async a => msg.channel.send({embed: {description: "You have exited the selection Loop", color: client.color}}).then(x => x.delete({timeout: 3000})));
    return undefined
  } 
  }
  
    }
}