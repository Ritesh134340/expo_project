const request = require('supertest');
const app=require("../index")
const User=require("../models/user.model")


describe('Users API endpoints', () => {

    describe('POST /users', () => {

      it('should create a new user', async () => {
        const res = await request(app)
          .post('/users')
          .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            bio: 'Lorem ipsum dolor sit amet'
          });
     
        expect(res.statusCode).toEqual(200);
        expect(res.body.mesg).toEqual('User created successfully !');
      },10000);
    
      it('should not create a new user with an existing email', async () => {
        const res = await request(app)
          .post('/users')
          .send({
            name: 'Test',
            email: 'test@example.com',
            bio: 'Testing with jest'
          });
     
        expect(res.statusCode).toEqual(409);
        expect(res.body.mesg).toEqual('User already exists !');
      },10000);
    });
  
    describe('GET /users', () => {
      it('should retrieve all users', async () => {
        const res = await request(app)
          .get('/users');
     
        expect(res.statusCode).toEqual(200);
        expect(res.body.mesg).toEqual('Ok');
        expect(res.body.usersDocument).toBeDefined();
      });
    },10000);
  
    describe('GET /users/:id', () => {
      it('should retrieve a specific user by id', async () => {
        const user = await request(app)
          .post('/users')
          .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            bio: 'Lorem ipsum dolor sit amet'
          });
     
        const res = await request(app)
          .get(`/users/${user.body.userData._id}`);
     
        expect(res.statusCode).toEqual(200);
        expect(res.body.mesg).toEqual('Ok');
        expect(res.body.userData).toBeDefined();
      });
    },10000);
  
    describe('PUT /users/:id', () => {
      it('should update a specific user by id', async () => {
        const user = await request(app)
          .post('/users')
          .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            bio: 'Lorem ipsum dolor sit amet'
          });
     
        const res = await request(app)
          .put(`/users/${user.body.userData._id}`)
          .send({
            bio: 'Updated bio'
          });
     
        expect(res.statusCode).toEqual(200);
        expect(res.body.mesg).toEqual('User updated successfully !');
      });
    },10000);
  
    describe('DELETE /users/:id', () => {
      it('should delete a specific user by id', async () => {
        const user = await request(app)
          .post('/users')
          .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            bio: 'Lorem ipsum dolor sit amet'
          });
     
        const res = await request(app)
          .delete(`/users/${user.body.userData._id}`);
     
        expect(res.statusCode).toEqual(200);
        expect(res.body.mesg).toEqual('User deleted successfully !');
      });
    },10000);
  });