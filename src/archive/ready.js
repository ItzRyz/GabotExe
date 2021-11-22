/*const Discord = require("discord.js")
const fs = require("fs");
let folder = ['developer', 'info', "moderation", "music"]

module.exports = (client) => {
  
  try {
  console.log('Ready')
  folder.forEach(function(a) {
    fs.readdir(`./src/cmds/${a}`, async (err, files) => {
      console.log(`【 Perintah 】 Berhasil Menemukan : ${files.length} Perintah Pada Kategory : ${a}`);
      if(err) return null;
    })
  })
  
   console.log(`Mempunyai : ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Pengguna`)
   console.log(`Sudah Memasuki : ${client.guilds.cache.size} Server`)
   console.log(`Bersama ${client.channels.cache.size} Saluran`)
  //function jamStatus(){
    
    let mt = client.mt.get(`mt.stat`)
    
    if(mt == 'off') {
     mt = [
      `g.help | @gaBOT` 
    //`k.help | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users`,
    //`k.help | ${client.guilds.cache.size.toLocaleString()} Server!`,
    //`k.help | ${client.channels.cache.size.toLocaleString()} Channels!`
        ]
    }
    
    if(mt == 'on') {
      mt = [
        `Bot is doing maintenance`
      ]
    }
    
   setInterval(async () => {
       const statuslist = mt;
    const random = Math.floor(Math.random() * mt.length);
    try {
      await client.user.setPresence({
        activity: {
          name: `${mt[random]}`,
          type: "STREAMING",
          url: 'https://www.twitch.tv/gbot'
        },
        status: "dnd"
      });
    } catch (error) {
      console.error(error);
    }
  }, 2000);
    //} setInterval(jamStatus, 10000);
  
  // const hook = new Discord.WebhookClient('671241850186760193', 'H_qbE5LM6tB5qTNHSkX8JDzVBCYU18xoMPfSt6lZ8EmRt1vfRK8vc-W2GOdlwBWYPuWM');
  // hook.send(`My Has Been Already Online!`);
   
  } catch (e) {
    console.log(e)
  }
    
};*/