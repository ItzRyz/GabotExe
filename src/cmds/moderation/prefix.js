const Discord = require("discord.js")

module.exports = {
    name: "prefix",
    category: "moderation",
    description: "Set new prefix",
    run: async (client, msg, args) => {
      
let lang = await client.bhs.fetch(`${msg.guild.id}.lang.bhs`)

if (lang == 'indonesia') {
if(!msg.member.hasPermission("MANAGE_GUILD")) return msg.channel.send('Kamu Tidak Memiliki Izin `MANAGE_GUILD` Untuk Melakukan Ini!')
}    
  
if (lang == 'indonesia') {

let pre = args[0]  
if (!pre) return msg.channel.send('Tolong Masukkan Prefix!')

await client.mod.set(`${msg.guild.id}.prefix.prefixes`, pre)
return msg.channel.send(`Prefix Berhasil Di Ubah Menjadi \`${pre}\``)
  
}
      
if (lang == 'english' || lang == undefined) {
if(!msg.member.hasPermission("MANAGE_GUILD")) return msg.channel.send("You Don't Have Permission `MANAGE_GUILD` To Do This!")
}
      
if (lang == 'english' || lang == undefined) {

let pre = args[0]
if (!pre) return msg.channel.send('Please Enter Prefix!')

await client.mod.set(`${msg.guild.id}.prefix.prefixes`, pre)
return msg.channel.send(`Successfully Changed The Prefix To \`${pre}\``)

}
      
    }
}