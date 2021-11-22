const Discord = require("discord.js")

module.exports = {
    name: "language",
    aliases: ["lang"],
    category: "moderation",
    description: "Set bot language",
    run: async (client, msg, args) => {
 
    let opti = args.slice(0).join(' ')
    let optical = opti.toLocaleLowerCase()
    let lang = client.bhs.fetch(`${msg.guild.id}.lang.bhs`)
    let p = await client.mod.fetch(`${msg.guild.id}.prefix.prefixes`);
  if (!p) {
    p = client.config.prefix;
  }
      
    if (lang == 'indonesia') {
      let e = new Discord.MessageEmbed()
      .setTitle("『 Perintah Bahasa 』")
      .setDescription(`**Catatan**\n• Perintah ini untuk mengubah bahasa bot!\n\n**Daftar Bahasa**\n${p}language english / en default kamu akan menggunakan bahasa ini\n${p}language indonesian / id jika kamu menggunakan bahasa ini bot akan menggunakan bahasa Indonesia!\n\n**Cara Menggunakan**\n${p}language indonesian/english\n${p}lang indonesia/english`)
      .setColor(client.color)
      .setImage('https://www.gambaranimasi.org/data/media/562/animasi-bergerak-garis-0170.gif')
      
      if (!opti) return msg.channel.send(e)
      }  

      
    if (lang == 'english' || lang == undefined) {
      let e = new Discord.MessageEmbed()
      .setTitle("『 Language Commands 』")
      .setDescription(`**Note**\n• This command is to change the bot's language!\n\n**List of Languages**\n${p}language english / en default you will use this language\n${p}language indonesian / id if you use this language you change this bot language to Indonesian!\n\n**How To Use**\n${p}language indonesia/english\n${p}lang indonesia/english`)
      .setColor(client.color)
      .setImage('https://www.gambaranimasi.org/data/media/562/animasi-bergerak-garis-0170.gif')
      
      if (!opti) return msg.channel.send(e)
    }
      
     if (optical.match("indonesian") || optical.match("id")) {
       if(!msg.member.hasPermission("MANAGE_GUILD") && msg.author.id !== "486502585587466240") return msg.channel.send({embed: {description: "You Don't Have Permission `MANAGE_GUILD` To Do This!", color: client.color}})
        if (lang == 'indonesia') return msg.channel.send({embed: {description: 'Bahasa sudah menggunakan bahasa `Indonesia`', color: client.color}})
         await client.bhs.set(`${msg.guild.id}.lang.bhs`, 'indonesia')
          return msg.channel.send({embed: {description: 'Bahasa disetel menjadi bahasa `Indonesia` :flag_id:', color: client.color}})
     }
      
    if (optical.match("english") || optical.match("en")) {
     if(!msg.member.hasPermission("MANAGE_GUILD") && msg.author.id !== "486502585587466240") return msg.channel.send('Kamu Tidak Memiliki Izin `MANAGE_GUILD` Untuk Melakukan Ini!')
      if (lang == 'english' || lang == undefined) return msg.channel.send({embed: {description: "The language already uses `English`", color: client.color}})
       await client.bhs.set(`${msg.guild.id}.lang.bhs`, 'english')
        return msg.channel.send({embed: {description: "Language is set to `English` :flag_gb:", color: client.color}})
    }
      
    }
}