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
      },
  };
  //const response = await fetch(config.dexcom.url+`users/self/egvs?startDate=${oldIsoDate}&endDate=${isoDate}`, options);
  const thirtyMinutes = 1000*60*30;
  const elapsedTime = Date.now() - Date.parse(json[0].date);
  if( elapsedTime >= thirtyMinutes  ){
    client.user.setActivity(`Stale Data:${json[0].sgv} (${elapsedTime/(1000*60)} minutes old)`);
    return;
  }
  const response = await fetch(`${config.nightscout.url}/api/v1/entries?token=${config.nightscout.token}&count=1`, options)
  const json = await response.json();
  //client.user.setActivity(`Stark is ${json.egvs[0].value}`);
  client.user.setActivity(`Stark is ${json[0].sgv}`)
}

export {name, execute}
