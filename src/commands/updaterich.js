import Authenticator from '../utils/OAuth'
import fetch from 'node-fetch'
import config from '../config'

const name = 'updaterich';
async function execute(message, client){
  const authy = new Authenticator();
  const starkUser = message.author;
  //const authToken = await authy.getAccessToken(starkUser);
  const isoDate = new Date().toISOString().substring(0,19);
  const oldIsoDate = new Date(Date.now()-86400000).toISOString().substring(0,19);
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

export {name, execute}
