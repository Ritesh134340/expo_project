

const request = require('supertest');
const app=require("../index")

const Post = require("../models/post.model");
const User = require("../models/user.model");




describe("POST /posts", () => {
  it("should create a new post", async () => {
   
    const user = new User({
      email: "newtest@example.com",
      name: "new test"
    });
    await user.save();

    // Send a POST request to create a new post
    const res = await request(app)
      .post("/posts")
      .send({
        email: user.email,
        content: "Hello world"
      })
      .expect(200);

    // Check that the post was created successfully
    expect(res.body.mesg).toBe("Post created successfully !");

    // Check that the post is saved in the database
    const posts = await Post.find({});
    expect(posts).toHaveLength(1);
    expect(posts[0].user_id.toString()).toBe(user._id.toString());
    expect(posts[0].content).toBe("Hello world");
  });

  it("should return an error if user is not found", async () => {
    // Send a POST request with an email of a user that does not exist
    const res = await request(app)
      .post("/posts")
      .send({
        email: "nonexistent@example.com",
        content: "Hello world"
      })
      .expect(404);

    // Check that an error message is returned
    expect(res.body.mesg).toBe("User not found, please signup !");
  });
});

describe("GET /posts", () => {
  it("should return all posts", async () => {
    // First, create some posts to test the GET request
    const user = new User({
      email: "test@example.com",
      name: "John Doe"
    });
    await user.save();
    const post1 = new Post({
      user_id: user._id,
      content: "Post 1"
    });
    await post1.save();
    const post2 = new Post({
      user_id: user._id,
      content: "Post 2"
    });
    await post2.save();

    // Send a GET request to get all posts
    const res = await request(app)
      .get("/posts")
      .expect(200);

    // Check that all posts are returned
    expect(res.body.mesg).toBe("ok");
    expect(res.body.postsDocument).toHaveLength(2);
    expect(res.body.postsDocument[0].content).toBe("Post 1");
    expect(res.body.postsDocument[1].content).toBe("Post 2");
  });
});





