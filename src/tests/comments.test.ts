import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import { Express } from "express";
import userModel, { IUser } from "../models/user_model";
import postModel from "../models/posts_model"

var app: Express;
// const testComments = {
//   comment: "This is a comment",
//   user: "677aa035c05f8cce6afbcc1a",
//   postId: "677a9c5304e40c4830856c10"
// }

type User = IUser & { token?: string };
const testUser: User = {
  username: "test",
  email: "test@user.com",
  password: "testpassword",
}

const testPost = {
  _id: "",
  title: "Test Post",
  content: "Test Content",
  user: ""
}

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await commentsModel.deleteMany();
  await postModel.deleteMany();
  await userModel.deleteMany();
  await request(app).post("/auth/register").send(testUser);
  const resUser = await request(app).post("/auth/login").send(testUser);
  testUser.token = resUser.body.accessToken;
  testUser._id = resUser.body._id;
  const resPost = await request(app).post("/posts")
        .set({ authorization: "JWT " + testUser.token })
        .send({
          title: "Test Post",
          content: "Test Content",
          user: resUser.body._id,
        });
  testPost._id = resPost.body._id
  expect(testUser.token).toBeDefined();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

var commentId = "";

describe("Comments Tests", () => {
  test("Comments test get all", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const response = await request(app).post("/comments")
    .set({ authorization: "JWT " + testUser.token })
    .send({
      comment: "This is a comment",
      user: testUser._id,
      postId: testPost._id
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.comment).toBe("This is a comment");
    expect(response.body.postId).toBe(testPost._id);
    expect(response.body.user).toBe(testUser._id);
    commentId = response.body._id;
  });

  test("Test get comments by post id", async () => {
    const response = await request(app).get("/comments/" + testPost._id)
    .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].comment).toBe("This is a comment");
    expect(response.body[0].postId).toBe(testPost._id);
    expect(response.body[0].user).toBe(testUser._id);
  });
  
});