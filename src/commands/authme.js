import {Message, MessageCollector} from 'discord.js'
import log from '../utils/log'
import Authenticator from '../utils/OAuth'
import {UserDB} from '../utils/mongo'

export {name, execute}
const name = 'authme';
async function execute(message, messageArray){
  const auth = new Authenticator();

  const userQuery = {_id: message.author.id};
  if( !(await UserDB.exists(userQuery)) ){
    const newUser = new UserDB(userQuery);
    newUser.save();
    await message.channel.send('auth\'d')
  }

  auth.promptUser(message.author)
    .catch(e => {
      //later convert to usermessaged error
      log.error(`${e} \nFrom ${message.url}`);
    });
}
