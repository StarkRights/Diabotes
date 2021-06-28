import log from './log'
import fetch from 'node-fetch'

const accessToken = null;
const refreshToken = null;

class Authenticator {
  constructor(baseURL,  id, secret, authCode){
    this.baseURL = baseURL;
    this.id = id;
    this.secret = secret;
    this.accessToken = null;
    this.refreshToken = null;

    this.authCode = authCode;
  }

  getAuthURL(){
    const authURL = 'put it here';
    return authURL;
  }

  async promptUser(userChannel){
    const authURL = this.getAuthUrl();
    await userChannel.send(`Please use the following link to authenticate with Dexcom & provide us access to your data : \`${authURL}\``);
  }

  async getAccessToken(authCode){
    const options = {
        // These properties are part of the Fetch Standard
        method: 'POST',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body: {
          client_secret: this.secret,
          client_id: this.id,
          code: authCode,
          grant_type: 'authorization_code',
          redirect_uri: 'shit',
        }
    };
    const response = await fetch(this.baseURL+'token', options);
    //log.info(`ResponseBodyType ${typeof response.body}`);
    //const responseBody = response.body.getReader().read();
    console.log(response.json());

    //store tokens.
  }

  refreshAuth(){

  }
}


export {Authenticator}
