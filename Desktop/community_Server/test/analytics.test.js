const request = require('supertest');
const app=require("../index")
const Post = require("../models/post.model");
const User = require("../models/user.model");


describe('User Analytics API', () => {
    // Test for /users
    describe('GET /users', () => {
      it('should return the total number of users', async () => {
        const res = await request(app)
          .get('/analytics/users')
          .expect(200);
  
        expect(res.body.mesg).toEqual('Ok');
        expect(typeof res.body.total).toEqual('number');
      }, 10000);
    
      it('should return Internal server error when there is an error from the server', async () => {
        const mockFn = jest.spyOn(User, 'find').mockImplementationOnce(() => { throw new Error(); });
  
        const res = await request(app)
          .get('/analytics/users')
          .expect(500);
    
        expect(res.body.mesg).toEqual('Internal server error !');
    
        mockFn.mockRestore();
      }, 10000);
    });
  
    // Test for /users/top-active
    describe('GET /users/top-active', () => {
      it('should return the top active users', async () => {
        const res = await request(app)
          .get('/analytics/users/top-active')
          .expect(200);
    
        expect(res.body.mesg).toEqual('Ok');
        expect(Array.isArray(res.body.active)).toBeTruthy();
      }, 10000);
    
      it('should return Internal server error when there is an error from the server', async () => {
        const mockFn = jest.spyOn(Post, 'aggregate').mockImplementationOnce(() => { throw new Error(); });
  
        const res = await request(app)
          .get('/analytics/users/top-active')
          .expect(500);
    
        expect(res.body.mesg).toEqual('Internal server error !');
    
        mockFn.mockRestore();
      }, 10000);
    });
  
    // Test for /posts
    describe('GET /posts', () => {
      it('should return the total number of posts', async () => {
        const res = await request(app)
          .get('/analytics/posts')
          .expect(200);
    
        expect(res.body.mesg).toEqual('Ok');
        expect(typeof res.body.total).toEqual('number');
      }, 10000);
    
      it('should return Internal server error when there is an error from the server', async () => {
        const mockFn = jest.spyOn(Post, 'find').mockImplementationOnce(() => { throw new Error(); });
  
        const res = await request(app)
          .get('/analytics/posts')
          .expect(500);
    
        expect(res.body.mesg).toEqual('Internal server error !');
    
        mockFn.mockRestore();
      }, 10000);
    });

    describe('GET /posts/top-liked', () => {
        it('should return the top 5 liked posts', async () => {
          const res = await request(app).get('/analytics/posts/top-liked');
    
          expect(res.statusCode).toEqual(200);
          expect(res.body.mesg).toEqual('Ok');
          expect(res.body.topLiked).toBeDefined();
          expect(res.body.topLiked.length).toBeLessThanOrEqual(5);
        }, 10000);
      });
    });
  