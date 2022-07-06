const request = require('supertest');
const app = require('../index');
const { faker } = require('@faker-js/faker');


describe('test of users routes',() => {
    test('should successfully create new user', async() => {
        const newUser = {
            nome: faker.lorem.words(2),
            email: faker.internet.email(),
            psw: faker.lorem.words(1),
            isadmin: faker.datatype.boolean()
        }
        const {body,statusCode} = await request(app).post('/users').send(newUser);
        
        expect(body.name).toBe(newUser.name);

    })
});
