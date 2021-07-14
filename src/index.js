import {Message, Client, Collection, User} from 'discord.js'
import config from './config'
import fs from 'fs'
import log from './utils/log'
import {join, dirname} from 'path'
import Authenticator from './utils/OAuth'
import fetch from 'node-fetch'
// A bit of necessary magic since we're bable-less. __dirname doesn't exist in ES Scope.
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new Client();
client.commands = new Collection();
const token = config.bot.token;
const botId = config.bot.id
const prefix = 'db!';

const authy = new Authenticator();

//command import
const commandFiles = fs.readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	(async () => {
		const command = await import(`./commands/${file}`)
		client.commands.set(command.name, command);
  })();
}





// Message reception & command routing logic
client.once('ready', async () =>{
    //Initial login execution
    log.info('Client#ready -> Ready!');
		const starkId = config.starkId;
		async function updateRich(){
			const starkUser = await client.users.fetch(starkId);
			//const authToken = await authy.getAccessToken(starkUser);
			const isoDate = new Date().toISOString().substring(0,18);
			const oldIsoDate = new Date(Date.now()-86400000).toISOString().substring(0,18);
			const options = {
					// These properties are part of the Fetch Standard
					method: 'GET',
					headers: {
						//authorization: `Bearer ${authToken}`
						accept: 'application/json',
						api_secret: config.nightscout.token
					},
			};
			//const response = await fetch(config.dexcom.url+`users/self/egvs?startDate=${oldIsoDate}&endDate=${isoDate}`, options);
			const response = await fetch(`http://cgm-itc.herokuapp.com/api/v1/entries?token=${config.nightscout.token}&count=1`, options)
			const json = await response.json();
			//client.user.setActivity(`Stark is ${json.egvs[0].value}`);
			client.user.setActivity(`Stark is ${json[0].sgv}`)
		}
		setInterval(updateRich, 300000);

});


client.on('message', async (message) =>{
	if(message.author.bot == true){return;}
  //const message = {content: 'nb!setchannel', guild:{id:731352346449149963}}
	const guild = message.guild.id;

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
    client.commands.get(command).execute(message, client);
  } catch(e){
    log.error(e);
  }
});








client.login(token)
  .catch(e =>{
    log.error(`Client#LoginFailure -> ${e}`);
  });
