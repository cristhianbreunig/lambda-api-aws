const { handler } = require('./index.js');

describe('create-book', () => {
  test('Should create a book', () => {
    const payload = {
      body: JSON.stringify({
        name: 'The book of the books',
        description: 'The great book. You should read.',
        author: 'Unknown',
      }),
    };
    
    const response = handler(payload);
    expect(response).toHaveProperty('statusCode', 200);
    expect(JSON.parse(response.body)).toHaveProperty('name', JSON.parse(payload.body).name);
    expect(JSON.parse(response.body)).toHaveProperty('description', JSON.parse(payload.body).description);
    expect(JSON.parse(response.body)).toHaveProperty('author', JSON.parse(payload.body).author);
    expect(JSON.parse(response.body)).toHaveProperty('_id');
  });

  test('Should fail when create a book', () => {
    const payload = {
      body: JSON.stringify({
        description: 'The great book. You should read.',
        author: 'Unknown',
      }),
    };
    
    const response = handler(payload);
    expect(response).toHaveProperty('statusCode', 400);
    expect(JSON.parse(response.body)).toHaveProperty('message', 'Insufficient attributes');
  });
});