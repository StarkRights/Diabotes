import Authenticator from '../utils/OAuth'

const name = 'updaterich';
async function execute(message, client){
  const starkUser = message.author;
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

export {name, execute}
