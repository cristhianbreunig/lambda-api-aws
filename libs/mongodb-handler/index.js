const { MongoClient } = require('mongodb');

const MongoURI = process.env.MONGO_URL;
let Connection = null;

async function getConnection() {
  const connection = await MongoClient.connect(MongoURI, { useNewUrlParser: true, poolSize: 10, useUnifiedTopology: true });
  const db = connection.db('tutorial-api-testavel');
  Connection = db;
  return Connection;
}

exports.insertOne = async (data) => {
  const db = await getConnection();
  return db.collection('books').insertOne(data);
}
