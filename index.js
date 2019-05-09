const TelegramBot = require('node-telegram-bot-api');


const token = '736488113:AAFus1qUVVwxXbBkw2BogvRP-_4kjoXkq_o';

const bot = new TelegramBot(token, {polling: true});

const axios = require('axios');
const cheerio = require('cheerio');
const needle = require('needle');
const trees = require('trees');

const URL = 'https://sinoptik.ua';
 

bot.onText(/today/, (msg) => {
	needle.get(URL,  function(err, res){
  if (err) throw (err);

  let $ = cheerio.load(res.body);

 // console.log($(".main #bd2").text());
   let something  = $("#bd1 .temperature ").text();
   console.log(something);
    const chatId = msg.chat.id;
  bot.sendMessage(chatId, something);
})
  
});

bot.onText(/tomorrow/, (msg) => {
	needle.get(URL,  function(err, res){
  if (err) throw (err);

  let $ = cheerio.load(res.body);

 // console.log($(".main #bd2").text());
   let something  = $("#bd2 .temperature ").text();
   console.log(something);
    const chatId = msg.chat.id;
  bot.sendMessage(chatId, something);
})
  
});


bot.onText(/next/, (msg) => {
	needle.get(URL,  function(err, res){
  if (err) throw (err);

  let $ = cheerio.load(res.body);

 // console.log($(".main #bd2").text());
   let something  = $("#bd3 .temperature ").text();
   console.log(something);
    const chatId = msg.chat.id;
  bot.sendMessage(chatId, something);
})
  
});



 

