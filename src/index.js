import {Message, Client, Collection, User} from 'discord.js'
import config from './config'
import fs from 'fs'
import log from './utils/log'
import {join} from 'path'
import Authenticator from './utils/OAuth'
// A bit of necessary magic since we're bable-less. __dirname doesn't exist in ES Scope.
import { dirname } from 'path';
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
	async () =>{
		const command = await import(`./commands/${file}`);
		client.commands.set(command.name, command);
  }
}





// Message reception & command routing logic
client.once('ready', async () =>{
    //Initial login execution
    log.info('Client#ready -> Ready!');
		const starkId = config.starkId;
		async function updateRich(){
			const starkUser = client.users.fetch(starkId);
			const authToken = await Authenticator.getAccessToken(starkUser);
			const isoDate = new Date().toISOString();
			const oldIsoDate = new Date(Date.now()-900000);
			const options = {
					// These properties are part of the Fetch Standard
					method: 'POST',
					headers: {
						authorization: `Bearer ${authToken}`
					},
					body: {
						startDate: oldIsoDate,
						endDate: isoDate,
					}
			};
			const response = await fetch(this.baseURL+'users/self/egvs', options);
			client.user.setActivity(`Stark is ${response.egvs[0].value}`);
		}
		setInterval(updateRich(), 300000);

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
