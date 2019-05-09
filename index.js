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
   
   let min_max  = $("#bd1 .temperature ").text();
   let current_temperature =  $(".today-temp").text(); 
   let temperature = [$(".weatherDetails .temperature .p1").text(), "   ", $(".weatherDetails .temperature .p2").text(), "  " , $(".weatherDetails .temperature .p3").text(),"   ",$(".weatherDetails .temperature .p4").text(),"    ",$(".weatherDetails .temperature .p5").text(),"     ",$(".weatherDetails .temperature .p6").text(),"     ",$(".weatherDetails .temperature .p7").text(),"    ",$(".weatherDetails .temperature .p8").text()].join("");
   let temperatureSens = [$(".weatherDetails .temperatureSens .p1").text(), "   ", $(".weatherDetails .temperatureSens .p2").text(), "  " , $(".weatherDetails .temperatureSens .p3").text(),"   ",$(".weatherDetails .temperatureSens .p4").text(),"    ",$(".weatherDetails .temperatureSens .p5").text(),"     ",$(".weatherDetails .temperatureSens .p6").text(),"     ",$(".weatherDetails .temperatureSens .p7").text(),"    ",$(".weatherDetails .temperatureSens .p8").text()].join("");
  let atmosphere_pressure = $(".gray").text();
 let array =  atmosphere_pressure.split("  ");
    console.log(min_max);
    const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Today the temperature:" + min_max);
  bot.sendMessage(chatId, "Current temperature: " + current_temperature );
  bot.sendMessage(chatId, "All details"+`\n`+"0:00 3:00 6:00 9:00 12:00 15:00 18:00 21:00"+`\n`+temperature+`\n`+temperatureSens);
  bot.sendMessage(chatId,"Atmosphere pressure for all day:"+array[0,8])
})
  
});


bot.onText(/tomorrow/, (msg) => {
	needle.get(URL,  function(err, res){
  if (err) throw (err);

  let $ = cheerio.load(res.body);

   let min_max  = $("#bd1 .temperature ").text();
   let current_temperature =  $(".today-temp").text();
   console.log(min_max);
    const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Tomorrow the temperature is" + min_max);
})
  
});




 

