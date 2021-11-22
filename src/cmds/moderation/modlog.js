const Discord = require("discord.js")

module.exports = {
    name: "modlog",
    aliases: ["logs"],
    category: "moderation",
    description: "For set modlogs",
    run: async (client, msg, args) => {
      
    let opti = args.slice(0).join(' ')
    let optical = opti.toLocaleLowerCase()
    let lang = client.bhs.fetch(`${msg.guild.id}.lang.bhs`)
    let p = client.mod.fetch(`${msg.guild.id}.prefix.prefixes`)
    if (!p) {
      p = client.config.prefix;
    }
    
    if (lang == 'indonesia') {
    
      let embed = new Discord.MessageEmbed()
      .setTitle("『 Perintah ModLog 』")
      .setDescription(`**Catatan**\n•Perintah ini untuk menyetel\n\n**Daftar Perintah**\n${p}modlog set channel\n${p}modlog set nyala/mati\n${p}modlog set channel private`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.color)
      
    if(!opti) return msg.channel.send(embed)
    }    

    }
}