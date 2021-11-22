//const cfg = require("../data/config.json");
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
const config = require('../../data/config.json')

module.exports = {
    name: "queue",
    aliases: ["qu", "q"],
    category: "music",
    description: "See your song",
    run: async (client, message, args, color, queue) => {
      
  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  let lang = await db.fetch(`${message.guild.id}.lang.bhs`)
  let p = await db.fetch(`${message.guild.id}.prefix.prefixes`)
  if(!p){
    p = config.prefix;
  }

   const emoji = require('discord.js').RichEmbed;

  const voiceChannel = message.member.voice.channel;
      if(queue.has(message.guild.id) && voiceChannel.id !== queue.get(message.guild.id).voiceChannel.id) return message.channel.send(`Kamu harus berada di saluran **${queue.get(message.guild.id).voiceChannel.name}** untuk melihat antrian musik`);
if (!voiceChannel) return message.channel.send ('Maaf, kamu harus ada di dalam saluran suara untuk melihat antrian musik!');
if (!serverQueue) {
  return message.channel.send("Tidak ada musik yang di putar.");
}
    let number = serverQueue.songs.map((song,index) => index ==0 ?null :`**[${index}]** ${song.title} | Diminta Oleh » ${song.request}`)
    number = chunk(number, 5);
  

    let index = 0;
  
  try {
  const ge = new Discord.MessageEmbed()
  .setColor(color)
  .setAuthor(`| Antrian Lagu |`, message.guild.iconURL)
  .setDescription(`Sedang Diputar : **${serverQueue.songs[0].title}** | Diminta Oleh » ${serverQueue.songs[0].request}\n\n ${number[index].join('\n')}`)
  .setFooter(`Page ${index+1} of ${number.length}`)
    const m = await message.channel.send(ge);
    await m.react('⬅');
  await m.react('🔴');
    await m.react('➡');
    async function awaitReaction() {
    const filter =(rect, usr) => ['⬅', '🔴', '➡'].includes(rect.emoji.name) && usr.id === message.author.id;
        const response = await m.awaitReactions(filter, {
            max: 1,
            time: 1000000
        });
        if(!response.size){
            return undefined;
        }
        const emoji = response.first().emoji.name;
        if(emoji === '⬅') index--;
    if(emoji === '🔴')  m.delete();
        if(emoji === '➡') index++;
    
        index = ((index % number.length) + number.length) % number.length;
        ge.setDescription(`Sedang Diputar : **${serverQueue.songs[0].title}** | Diminta Oleh » ${serverQueue.songs[0].request}\n\n ${number[index].join('\n')}`)
    ge.setFooter(`Page ${index+1} of ${number.length}`)
        await m.edit(ge);
        return awaitReaction();
    }
    return awaitReaction();
  }
  catch(e){
   console.log(e) //return message.channel.send(`Oh, an error ocurred :( \`${e.message}\` try again later`)
  }

}
}

      
function chunk(array, chunkSize) {
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
  }  