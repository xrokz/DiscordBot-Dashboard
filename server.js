const port = 80
const Discord = require("discord.js")
const client = new Discord.Client()
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const btoa = require('btoa');
var i = 0;

const app = express();


app.set('view engine', 'ejs')

const CLIENT_ID = process.env.CLIENT_ID; // your bot's ID
const CLIENT_SECRET = process.env. CLIENT_SECRET; // your bot's client secret   

const redirect = encodeURIComponent('http://agentx.gq:5000/server/callback');


app.get("/manage/:gld/:user", async (req, res) => {
  let guild = req.params.gld;
  let user = req.params.user;
  let vguild = client.guilds.get(guild);
  let vuser = client.users.get(user)
  if(vguild && vuser) {
   let ug = vguild.members.get(user)
  if(ug.permissions !== 2146958847) {
 res.redirect("http://agentx.gq/agentx/index.html")
 } else {
 res.render('manage', {user: user, guild: vguild, client: client});
}
  } else {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot`)
  }
 
  });

async function getUser(token) {
  const myRes = await fetch("https://discordapp.com/api/users/@me",
         {
           method: 'GET',
           'content-Type': 'x-www-form-urlencoded',
           headers: {
             Authorization: "Bearer "+token,
           },
         });
  return myRes.json();
  }
  
  
  async function getGuilds(token) {
    const myGuildsRes = await fetch(`https://discordapp.com/api/users/@me/guilds`,
    {
      method: 'GET',
      'content-Type': 'x-www-form-urlencoded',
      headers: {
        Authorization: "Bearer "+token,
      },
    });
    return myGuildsRes.json()
  }

client.login(process.env.BOT_TOKEN)

