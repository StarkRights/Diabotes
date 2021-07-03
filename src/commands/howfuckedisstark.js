import {Message, MessageCollector} from 'discord.js'
import log from '../utils/log'

export {name, execute}
const name = 'howfuckedisstark';
async function execute(message, messageArray){

  message.channel.send(`Lmfao this doesn't work yte. Tbh he's pretty fucked bc of the mental toll this stupid fucking bot took on him.`)
    .catch(e => {
      //later convert to usermessaged error
      log.error(`${e} \nFrom ${message.url}`);
    });

}
