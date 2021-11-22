const Discord = require("discord.js")

module.exports = {
    name: "nuke",
    category: "moderation",
    description: "For Nuke Channels",
    run: async (client, msg, args, color) => {
      
      try {
let l = await client.bhs.fetch(`${msg.guild.id}.lang.bhs`)
if(!msg.member.hasPermission("MANAGE_CHANNELS") && msg.author.id !== "486502585587466240") return msg.channel.send('You Dont Have Permission MANAGE_CHANNELS')

let channel = msg.guild.channels.cache.get(msg.channel.id)
        const permissions = channel.permissionsFor(client.user);
        if (l == 'indonesia') {
    if (!permissions.has('MANAGE_CHANNELS')) {
      return msg.channel.send('Saya tidak dapat mengakses saluran karena tidak ada izin MANAGE_CHANNELS!');
    } 
        }
        if (l == 'english' || l == undefined){
      if (!permissions.has('MANAGE_CHANNELS')) {
      return msg.channel.send("I can't access the channel because there is no permission MANAGE_CHANNELS!");
    }     
        }
        
if (l == 'indonesia') {
let channel = msg.guild.channels.cache.get(msg.channel.id)
 await msg.channel.send('**Channel di ledakkan dalam 3 detik**').then(x => x.delete({timeout: 1000}))
 await msg.channel.send('**2**').then(x => x.delete({timeout: 1000})) 
 await msg.channel.send('**1**').then(x => x.delete({timeout: 1000}))
      
channel.delete()
channel.clone({options: {name: msg.channel.name, withPermissions: true, withTopic: true}}).then(async cenel => {
  
let pos = msg.channel.rawPosition
await channel.setPosition(pos)
  
let embed = new Discord.MessageEmbed()
.setTitle('Channel berhasil di ledakkan')
.setImage('https://cdn.discordapp.com/attachments/684379815154810892/688781762079621186/giphy.gif')
.setColor(color);
cenel.send(embed).then(a => a.delete({timeout: 5000}))
        
});
  
  
}
      
      if (l == 'english' || l == undefined) {
let channel = msg.guild.channels.cache.get(msg.channel.id)
 await msg.channel.send('**The channel is blown up in 3 second**').then(x => x.delete({timeout: 1000}))
 await msg.channel.send('**2**').then(x => x.delete({timeout: 1000})) 
 await msg.channel.send('**1**').then(x => x.delete({timeout: 1000}))
      
        
channel.delete()
channel.clone({options: {name: msg.channel.name, withPermissions: true, withTopic: true}}).then(async cenel => {
  
let pos = msg.channel.rawPosition
await channel.setPosition(pos)
  
let embed = new Discord.MessageEmbed()
.setTitle('Successfully exploded')
.setImage('https://cdn.discordapp.com/attachments/684379815154810892/688781762079621186/giphy.gif')
.setColor(color);
cenel.send(embed).then(a => a.delete({timeout: 5000}))
      
});
        
        
        
}
      } catch (e) {
        console.log(e)
      }
  
    }
}