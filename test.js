const request = require('supertest');
const app = require('./server')

// describe('GET /', () => {
//   it('should return 200 OK', async () => {
//     const res = await request(app).get('/');
//     expect(res.statusCode).toEqual(200);
//     expect(res.text).toContain('Hello'); // adjust to your response
//   });
// });

describe('GET /', () => {
    it('should return Hello World!', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Hello World!');
    }
);
});