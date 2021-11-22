const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: "shuffle",
    aliases: ["sf"],
    category: "music",
    description: "To random your music",
    run: async (client, msg, args, color, queue) => {
      
    const args1 = msg.content.split(' ')
    let lang = await client.bhs.fetch(`${msg.guild.id}.lang.bhs`)
    let opti = args.slice(0).join(' ')
    let optical = opti.toLocaleLowerCase()
    const voiceChannel = msg.member.voice.channel;
  
  
    let serverQueue = client.queue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send("❌ | I'm not playing anything?");
    if (!voiceChannel) return msg.channel.send(`❌ | You're not in a voice channel!`);
    if(queue.has(msg.guild.id) && voiceChannel.id !== queue.get(msg.guild.id).voiceChannel.id) return msg.channel.send(`Kamu harus berada di saluran **${queue.get(msg.guild.id).voiceChannel.name}** untuk mengacak daftar antrian`);
    
      
    await msg.reply("<a:loadingblu:871898695413678080> Waiting for shuffle").then(x => x.delete({timeout: 3000}));
      
    if(serverQueue.songs.length < 3) return msg.reply('<a:error:898680623928057977> Daftar antrian tidak dapat di acak!');
    
    return shuffleQueue(serverQueue.songs, msg);
  }
}

function shuffleQueue(squeue, message){
  for (let i = squeue.length - 1; i > 0; i--){
    let j = Math.round(Math.random() * (i + 1));
    while(j == 0)  
        j = Math.round(Math.random() * (i + 1));
    const temp = squeue[i];
    squeue[i] = squeue[j];
    squeue[j] = temp;
  }
  message.channel.send("✅ | Queue shuffled!");
  return squeue;
}