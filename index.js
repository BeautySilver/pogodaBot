
const TelegramBot = require('node-telegram-bot-api');


const token = '736488113:AAFus1qUVVwxXbBkw2BogvRP-_4kjoXkq_o';

const bot = new TelegramBot(token, {polling: true});

const axios = require('axios');
const cheerio = require('cheerio');
const needle = require('needle');
const trees = require('trees');
const table =require('table');
const getBorderCharacters = require('table');
let config = {
  border: table.getBorderCharacters(`void`)
}
const URL = 'https://sinoptik.ua';




bot.onText(/start/,(msg)=>{
	const chatId=msg.chat.id;
    bot.sendMessage(chatId, "Hello, "+msg.from.first_name +`\n`+
    	"Welcome to the meteorologbot. He can show a weather forecast for today, tomorrow and the day after tomorrow."+
      `\n`+"You can use the command /today or press the button to see a weather forecast for today."+`\n`+
      "You can use the command /tomorrow or press the button to see a weather forecast for tomorrow"+`\n`+
      "You can use the command /next or press the button to see a weather forecast for the day after tomorrow", {
      reply_markup: {   
            resize_keyboard: true, 	     
            keyboard: [["today", "tomorrow"], ["next","Details about today"]]
           
            
        }
   });
});

bot.onText(/today/, (msg) => {
	needle.get(URL,  function(err, res){
  if (err) throw (err);

  let $ = cheerio.load(res.body);
   
   let min_max  = $("#bd1 .temperature ").text();
  
   let current_temperature =  $(".today-temp").text(); 
   let temperature = [$(".weatherDetails .temperature").text()].join("");

   let temperatureSens = [$(".weatherDetails .temperatureSens").text()].join("");
  let atmosphere_pressure = $(".gray").text();
  let array_temperature = temperature.split(" ");
  console.log(temperature);
  console.log(array_temperature);
  let array_temperatureSens = temperatureSens.split(" ");
 
  let weather=$("#bd1 .weatherIco").attr('title');
  let data2 = [
  ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
    [array_temperature[1], array_temperature[2], array_temperature[3], array_temperature[4],array_temperature[5],array_temperature[6],array_temperature[7],array_temperature[8] ],
    [array_temperatureSens[1], array_temperatureSens[2], array_temperatureSens[3], array_temperatureSens[4], array_temperatureSens[5], array_temperatureSens[6], array_temperatureSens[7], array_temperatureSens[8]]
  ]	;
   let output2 = table.table(data2,config);
  
  console.log(typeof atmosphere_pressure);
  let array =  atmosphere_pressure.split("  ");
    console.log(min_max);
    const chatId = msg.chat.id;
   bot.sendPhoto(chatId, "C:/Users/gubar/Desktop/bot/src/d240.gif");
  bot.sendMessage(chatId, "Todays temperature:" + min_max+`\n`+weather);
  bot.sendMessage(chatId, "Current temperature: " + current_temperature);
  bot.sendMessage(chatId,"Atmosphere pressure for all day: "+array[0,8])
  bot.sendMessage(chatId, output2);
})
  
});







 

