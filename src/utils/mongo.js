import mongoose from 'mongoose'
import Authenticator from './OAuth'
import config from '../config'

const connectString = config.mongodb.connectionString;
mongoose.connect(connectString, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const userSchema = new mongoose.Schema({
  _id: String,
  accessToken: {
    token: String,
    expires: Date
  },
  refreshToken: {
    token: String,
    expires: Date
  },
  state: String
});

const UserDB = mongoose.model('User', userSchema);

class Database{
  async getUser(id){
    const idRegexp = `/^${id}/`
    await UserDB.find({ _id: idRegexp }, function (e, users) {
      if (e) throw Error(`User find error: ${e}`);
      return users;
    });
  }

  async newUser(id){
    try{
      const user = new UserDB({_id: id});
      await user.save(function (e, usr) {
        return usr;
      });
    }catch(e){
      throw Error(`E: ${e}`)
    }
  }

}

export {Database, UserDB};
