import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

import debug from 'debug';
const debugDb = debug('app:Database');

/** Generate/Parse an ObjectId */
const newId = (str) => new ObjectId(str);

/** Global variable storing the open connection, do not use it directly */
let _db = null;

async function connect() {
  if(!_db){
   const dbUrl = process.env.DB_URL;
   const dbName = process.env.DB_NAME;
   const client = await MongoClient.connect(dbUrl);
   _db = client.db(dbName);
  }
  return _db;
}

/** Connect to the database and verify the connection */
async function ping(){
  const db = await connect();
  const pong = await db.command({ ping: 1 });
  console.log('Ping function reached')
  debugDb(`Ping: ${JSON.stringify(pong)}`);
}

ping();