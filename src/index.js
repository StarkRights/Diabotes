import {Message, Client, Collection} from 'discord.js'
import config from './config.js'
import fs from 'fs'
import log from './utils/log'
import {join} from 'path'

const client = new Client();
client.commands = new Collection();
const token = config.bot.token;
const botId = config.bot.id


//command import
const commandFiles = fs.readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}





// Message reception & command routing logic
client.once('ready', () =>{
    //Initial login execution
    db.initialize();
    log.info('Client#ready -> Ready!');
});


client.on('message', async (message) =>{
	if(message.author.bot == true){return;}
  //const message = {content: 'nb!setchannel', guild:{id:731352346449149963}}
	const guild = message.guild.id;
	const configDb = new ConfigDb(guild);
	const prefix = await configDb.getPrefix();

  const prefixSubtr = message.content.substring(0, prefix.length);
  if( (prefixSubtr != prefix) || (message.author.id == botId) ){return;}

  const msgSubstr = message.content.substring(3);
	//console.log(`msgsubstr: ${msgSubstr}`)
  //console.log(`substr:${msgSubstr}`);
  //const wordEx = /([A-z])\w\S+/g;
	const wordEx = new RegExp(/(\S+)/, 'g');

  let msgArray = msgSubstr.match(wordEx);
  const command = msgArray.shift().toLowerCase();
  //console.log(`cmd: ${command}`);

  try{
    client.commands.get(command).execute(message, msgArray);
  } catch(e){
    log.error(e);
  }
});








client.login(token)
  .catch(e =>{
    log.error(`Client#LoginFailure -> ${e}`);
  });
