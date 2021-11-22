const Discord = require("discord.js")

module.exports = {
    name: "chatfilter",
    aliases: ["cf"],
    category: "moderation",
    description: "For Filtering Abusive Languages",
    run: async (client, msg, args) => {
      try {
      
    let opti = args.slice(0).join(' ')
    let optical = opti.toLocaleLowerCase()
    let lang = client.bhs.fetch(`${msg.guild.id}.lang.bhs`)  
    
    if (!opti) return msg.channel.send('Isi')
        
    if (optical.match("link")) {
      let optic = args.slice(0).join(" ")
      let optica = optic.toLocaleLowerCase();
      if (!optica) return null;    
    
    if (lang == 'indonesia') {
    if (optical.match('add')) {
      
     let add = args.slice(2).join(" ")
    if (!add) return msg.channel.send('Masukkan Link Yang Ingin Di Filter!')
      
    await client.cf.push(`${msg.guild.id}.cf.lk.link`, add)
      
    return msg.channel.send(`Berhasil Menambahkan \`${add}\` Kedalam ChatFilter Link Block`)
      
    }}}
        
        if (optical.match("link")) {
      let optic = args.slice(0).join(" ");
      let optica = optic.toLocaleLowerCase();
      if (!optica) return null;
        
    if (lang == 'indonesia') {
    if (optical.match('list')) {
    
    let list = client.cf.get(`${msg.guild.id}.cf.lk.link`)
    list = chunk(list, 5);
    
      let index = 0;

  const ge = new Discord.MessageEmbed()
  .setColor(client.color)
  .setAuthor(`| ChatFilter Link List |`, msg.author.displayAvatarURL())
  .setThumbnail(msg.guild.iconURL())
  .setDescription(list[index].join('\n'))
  .setFooter(`Page ${index+1} of ${list.length}`)
    const m = await msg.channel.send(ge);
    await m.react('⬅');
  await m.react('🔴');
    await m.react('➡');
    async function awaitReaction() {
    const filter =(rect, usr) => ['⬅', '🔴', '➡'].includes(rect.emoji.name) && usr.id === msg.author.id;
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
    
        index = ((index % list.length) + list.length) % list.length;
        ge.setDescription(list[index].join('\n'))
    ge.setFooter(`Page ${index+1} of ${list.length}`)
        await m.edit(ge);
        return awaitReaction();
    }
    return awaitReaction();
      
    }}}
        
        if (optical.match("link")) {
      let optic = args.slice(0).join(" ");
      let optica = optic.toLocaleLowerCase();
      if (!optica) return null;
          
          if (lang == 'indonesia') {
      if (optical.match('remove') || optical.match('hapus')) {
      //await client.cf.set(`id`, msg.author.id)
      
      let remove = args.slice(2).join(" ")
      if (!remove) return msg.channel.send('Masukkan Kata Yang Ingin Di Hapus Dari Daftar ChatFilter Link!')
      
      let a = await client.cf.get(`${msg.guild.id}.cf.lk.link`).filter(x => x !== remove)
      await client.cf.set(`${msg.guild.id}.cf.lk.link`, a)
      return msg.channel.send(`Berhasil Menghapus \`${remove}\` Dari Daftar ChatFilter Link`)
      
    }}}
    
    if (optical.match("badword") || optical.match("bw")) {
      let optic = args.slice(0).join(" ")
      let optica = optic.toLocaleLowerCase();
      if (!optica) return null;    
    
    if (lang == 'indonesia') {
    if (optical.match('add')) {
     
    let add = args.slice(2).join(" ")
    if (!add) return msg.channel.send('Masukkan Kata Yang Ingin Di Filter!')
      
    await client.cf.push(`${msg.guild.id}.cf.bw.chat`, add)
      
    return msg.channel.send(`Berhasil Menambahkan \`${add}\` Kedalam ChatFilter Badword`)
      
    }}}
      
        if (optical.match("badword") || optical.match("bw")) {
      let optic = args.slice(0).join(" ");
      let optica = optic.toLocaleLowerCase();
      if (!optica) return null;
        
    if (lang == 'indonesia') {
    if (optical.match('list')) {
    
    let list = client.cf.get(`${msg.guild.id}.cf.bw.chat`)
    list = chunk(list, 5);
    
      let index = 0;

  const ge = new Discord.MessageEmbed()
  .setColor(client.color)
  .setAuthor(`| ChatFilter Badword List |`, msg.author.displayAvatarURL())
  .setThumbnail(msg.guild.iconURL())
  .setDescription(list[index].join('\n'))
  .setFooter(`Page ${index+1} of ${list.length}`)
    const m = await msg.channel.send(ge);
    await m.react('⬅');
  await m.react('🔴');
    await m.react('➡');
    async function awaitReaction() {
    const filter =(rect, usr) => ['⬅', '🔴', '➡'].includes(rect.emoji.name) && usr.id === msg.author.id;
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
    
        index = ((index % list.length) + list.length) % list.length;
        ge.setDescription(list[index].join('\n'))
    ge.setFooter(`Page ${index+1} of ${list.length}`)
        await m.edit(ge);
        return awaitReaction();
    }
    return awaitReaction();
      
    }}}
        
         if (optical.match("badword") || optical.match("bw")) {
      let optic = args.slice(0).join(" ");
      let optica = optic.toLocaleLowerCase();
      if (!optica) return null;
           
      if (lang == 'indonesia') {
      if (optical.match('hapus')) {
      //await client.cf.set(`id`, msg.author.id)
      
      let remove = args.slice(2).join(" ")
      if (!remove) return msg.channel.send('Masukkan Kata Yang Ingin Di Hapus Dari Daftar ChatFilter!')
      
      let a = await client.cf.get(`${msg.guild.id}.cf.bw.chat`).filter(x => x !== remove)
      await client.cf.set(`${msg.guild.id}.cf.bw.chat`, a)
      return msg.channel.send(`Berhasil Menghapus \`${remove}\` Dari Daftar ChatFilter Badword`)
      
    }}}
        
        if (optical.match("badword") || optical.match("bw")) {
      let optic = args.slice(0).join(" ");
      let optica = optic.toLocaleLowerCase();
      if (!optica) return null;
          
      if (lang == 'indonesia') {
      if (optical.match('setrole')) {
        
      let mention = msg.mentions.roles.first()
      if (!mention) return msg.channel.send('Tolong Mention Role Terlebih Dahulu!')
        
      await client.cf.set(`${msg.guild.id}.cf.bw.role`, mention.id)
      return msg.channel.send(`Role Administrator Di Setel Ke ${mention}`)
        
      }}}
        
        
    
      } catch (e) {
        console.log(e)
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