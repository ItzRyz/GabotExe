module.exports = (client) => {

//Uptime
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


client.login(process.env.TOKEN).catch(e => {
  console.log("TOKENNYA KAGAK BISA WOE!");
});
  
}