const { handler } = require('./index.js');

describe('create-book', () => {
  test('Should create a book', () => {
    const payload = {};
    const response = handler(payload);
    expect(response).toHaveProperty('statusCode', 200);
    expect(JSON.parse(response.body)).toHaveProperty('event', payload);
  });
});