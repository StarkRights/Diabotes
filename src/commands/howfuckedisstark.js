import {Message, MessageCollector} from 'discord.js'
import log from '../utils/log'

export {name, execute}
const name = 'howfuckedisstark';
async function execute(message, messageArray){
  message.channel.send('Pretty fucked bruv, his bot is kinda broke dick.test')
    .catch(e => {
      //later convert to usermessaged error
      log.discord(`${e} \nFrom ${message.url}`);
    });
}
