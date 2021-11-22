const Discord = require('discord.js');
const config = require('../data/config.json');

module.exports = async (client, message) => {
  var msg = message
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  
   let prefix = await client.mod.fetch(`${message.guild.id}.prefix.prefixes`);
  if (!prefix) {
    prefix = config.prefix;
  }
   
  
  try {
  
   if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
    message.channel.send({embed: {description: `Hallo ${message.member} My Prefix In This Server ${prefix}`, color: client.color}})
    }
    
 let list = client.cf.fetch(`${msg.guild.id}.cf.bw.chat`)
 let role = client.cf.fetch(`${msg.guild.id}.cf.bw.role`)
 if (!role) {
   role = 1
 } 
  let wordArray = msg.content.split(" ")
  
  let filter = list;
    if (filter == undefined) return null
  var x = {}
    
 let linked = await client.cf.fetch(`${msg.guild.id}.cf.lk.link`)
 let only = await client.cf.fetch(`${msg.guild.id}.cf.lk.role`)
 const links = linked; 
let li = msg.content.split(" ")
let text = false
    
for (x = 0; x < filter.length; x++) {
    if (message.member.roles.cache.has(role)) return undefined;
    if (wordArray.includes(filter[x].toUpperCase()) || wordArray.includes(filter[x])) {
      await msg.delete();
      msg.channel.send(`${msg.author}, Dilarang Badword Disini!!`).then(x => x.delete({timeout: 2000}))
  }
 } 
 
     for (var a in links) {
       if (msg.content.toLowerCase().includes(links[a].toLowerCase())) text = true;
     }
    
    if (text) {
      await msg.delete()
      msg.channel.send(`${msg.author}, Tolong baca rules dilarang share link discord!`).then(x => x.delete({timeout: 2000}))
    }
    
     //if (client.player.has(msg.author.id)) {
    ///const playerData = client.player.get(msg.author.id);
    ///let msgCount = playerData.msgCount;
      if(parseInt(msg.author.id) === 5) {
        await message.channel.bulkDelete(5, true)
        //const role = msg.guild.roles.cache.get('699002290547195994')
        //msg.member.roles.add(role);
        msg.channel.send(`${msg.author}, Tolong Jangan Spam!!`)
      } /*else {
        msgCount++;
        playerData.msgCount = msgCount;
        client.player.set(msg.author.id, playerData);
      }*/
    //}
    /*else {
      client.player.set(msg.author.id, {
        msgCount: 1,
        lasMessage: message,
        timer: null
      });
      setTimeout(() => {
        client.player.delete(msg.author.id);
        //const role = msg.guild.roles.cache.get('699002290547195994')
        //await msg.member.roles.remove(role);
        //msg.channel.send('Kamu telah di unmute')
      }, 100)
    }*/
    
    
  } catch (e) {
    console.log(e)
  } 
  
}