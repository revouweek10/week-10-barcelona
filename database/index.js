const { MongoClient } = require("mongodb");

const MONGO_PROD = `mongodb://mongo:oC03pBOSTy51ELIt3hG9@containers-us-west-188.railway.app:7567`
const MONGO_URI= `mongodb://127.0.0.1:27017`

const DB_URI = process.env.ENV === 'production' ? MONGO_PROD : MONGO_URI 
const connectToDb = async () => {
  try {
    const client = await new MongoClient(DB_URI).connect();
    const db = client.db(process.env.MONGO_DB);
    console.log(`You have been CONNECTED.. lets goo...!!! `);
    return db
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
