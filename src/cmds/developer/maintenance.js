const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "maintenance",
    aliases: ["mt"],
    category: "developer",
    description: "Developer Only",
    run: async (client, msg, args) => {
 
      var mtget = client.mt.get(`mt.stat`)
      
      let op = args.slice(0).join(' ')
      let opti = op.toLocaleLowerCase()
    
      let lang = client.bhs.fetch(`${msg.guild.id}.lang.bhs`)  
      
      if(msg.author.id !== "486502585587466240" && msg.author.id !== "449594065248583680") return msg.channel.send(`Not developer`);
      
      if(lang == "indonesia") {
      if(opti.match("on")) {
       if(msg.author.id !== "486502585587466240" && msg.author.id !== "449594065248583680") return msg.channel.send(`Not developer`);
        
        if(mtget == 'on') return msg.channel.send({embed: {description: "Bot Sudah Dalam Keadaan Maintenance!", color: client.color}})
        
       await msg.channel.send({embed: {description: "Bot Disetel Menjadi Maintenance", color: client.color}})
       await client.mt.set(`mt.stat`, 'on')
       await process.exit(0)
        
      }
      
    
      if(opti.match("off")) {
        if(msg.author.id !== "486502585587466240" && msg.author.id !== "449594065248583680") return msg.channel.send(`Not developer`);
        
        if(mtget == 'off') return msg.channel.send({embed: {description: "Maintenance Sudah Dimatikan!", color: client.color}})
        
        await msg.channel.send({embed: {description: "Maintenance Dimatikan", color: client.color}})
        await client.mt.set(`mt.stat`, 'off')
        await process.exit(0)
        
      }
      }
      
    }
}