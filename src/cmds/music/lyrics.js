const Discord = require("discord.js")
const genius = require("genius-lyrics");
const Genius = new genius.Client(process.env.genius);
const db = require("quick.db")
const moment = require("moment")

module.exports = {
    name: "lyrics",
    aliases: ["l"],
    category: "music",
    description: "Get lyrics of any song or the lyrics of the currently playing song",
    usage: "[lyrics | <song name> ]",
    run: async (client, msg, args, color, queue) => {
      
let lang = await client.bhs.fetch(`${msg.guild.id}.lang.bhs`)
const serverQueue = queue.get(msg.guild.id)
try {
let a = args.join(" ") || serverQueue.songs[0].title
  
if (lang == 'indonesia') {
      try {
      
Genius.songs.search(a).then(async result => {
const song = result[0];
 const lyrics = await song.lyrics();
 const id = await song.id;
 const title = await song.title;
 const url = await song.url;
 const tum = await song.thumbnail;
 const as = song.artist
 const asuk = as.name;
 
  let embed = new Discord.MessageEmbed()
  .setTitle(`${title} By ${as.name}`)
  .setURL(url)
  .setColor(client.color)
  .setThumbnail(tum);
  
for(let i = 0; i < lyrics.length; i += 2045) {
    const asuk = lyrics.substring(i, Math.min(lyrics.length, i + 2045));
    
  
  msg.channel.send(embed.setDescription(asuk))
}
  
}).catch(e => msg.channel.send(`Lyrics Berjudul \`${a}\` Tidak dapat di temukan!`))
        
      } catch (e) {
        //console.log(e)
        //const serverQueue = queue.get(msg.guild.id)
        //const sea = args.join(" ") || serverQueue.songs[0].title
  return msg.channel.send(`Lyrics Berjudul \`${a}\` Tidak dapat di temukan!`)
      }
}
      
      if (lang == 'english' || lang == undefined) {
      try {
      
Genius.songs.search(a).then(async result => {
const serverQueue = queue.get(msg.guild.id)
const search = await Genius.findTrack(a);
const url = await Genius.getUrl(search);
const lyricsJSON = await Genius.getLyrics(url);
const lyrics = lyricsJSON.lyrics;
const id = await Genius.getId(search);
let song = await Genius.findTrackByID(id)

for(let i = 0; i < lyrics.length; i += 2048) {
    const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 2048));
    msg.channel.send({embed: {title: `Searching For : \`${song.response['song'].full_title}\``, description: toSend, color: color, thumbnail: client.user.displayAvatarURL(), timestamp: Date.now() }});
}})

      } catch (e) {
        const serverQueue = queue.get(msg.guild.id)
        const sea = args.join(" ") || serverQueue.songs[0].title
        console.log(e)
        return msg.channel.send(`Lyrics Name \`${sea}\` Is not found!`)
      }
}
} catch (e) {
  return msg.channel.send(`Tolong masukkan judul lagu!`)
}
    }}