import express from 'express'
import log from './utils/log'
import {UserDB} from './utils/mongo.js'
import Authenticator from './utils/OAuth'

const app = express();



app.get('/', async function (req, res) {
  log.info(`Received request`);
  res.send(`thank you!`);
  const userDoc = UserDB.findOne({state: req.query.state});

  log.info(`Exhanging Auth Code`)
  try{
    Authenticator.exchangeAuthCode(req.query.code, userDoc);
    log.info(`AuthCode Exchanged, Tokens Stored`);
  }
  catch(e) {
      log.error(`AuthCode exchange error -> ${e}`)
    }
});

app.listen(8443);
