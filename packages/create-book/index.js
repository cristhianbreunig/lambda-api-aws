const { MongoClient } = require('mongodb');

// Variável de ambiente que guarda o endereço de conexão com o DB
const MongoURI = process.env.MONGO_URL;

exports.handler = async (event) => {
  const { name, description, author } = JSON.parse(event.body);

  // Validação dos atributos de entrada da função
  if (!name || !description || !author) return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Insufficient attributes' }),
  };

  // iniciando conexão com o DB
  const connection = await MongoClient.connect(MongoURI, { useNewUrlParser: true, poolSize: 10, useUnifiedTopology: true });
  const db = connection.db('tutorial-api-testavel');
  const col = db.collection('books');

  try {
    const response = await col.insertOne({ name, description, author });
    await connection.close();
    return {
      statusCode: 200,
      body: JSON.stringify(response.ops[0]),
    };
  } catch (error) {
    await connection.close();
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error when inserting book on database' }),
    };
  }
}