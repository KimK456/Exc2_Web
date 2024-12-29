import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import { Express } from "express";

var app: Express;
var postId = ""

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  postId = (await request(app).get("/posts?owner=TestOwner")).body[0]._id
  await commentsModel.deleteMany();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let testComments = {
  content: "This is a comment",
  author: "David",
  postId: postId
}

let commentId = "";

describe("Comments Tests", () => {

  test("Comments test get all", async () => {
    const response = await request(app).get("/comments/");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const response = await request(app).post("/comments/").send(testComments);
    expect(response.statusCode).toBe(201);
    expect(response.body.content).toBe(testComments.content);
    expect(response.body.postId).toBe(testComments.postId);
    expect(response.body.author).toBe(testComments.author);
    commentId = response.body._id;
  });

  test("Test get comment by post id", async () => {
    const response = await request(app).get("/comments/" + testComments.postId);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].content).toBe(testComments.content);
    expect(response.body[0].postId).toBe(testComments.postId);
    expect(response.body[0].author).toBe(testComments.author);
  });

  test("Test Update comment By ID", async () => {
    const response = await request(app).put("/comments/" + commentId).send({
      content: "Test Comment - New Content",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.postId).toBe(testComments.postId);
    expect(response.body.content).toBe("Test Comment - New Content");
    expect(response.body.author).toBe("David");
    commentId = response.body._id;
  });

  test("Test Delete Comment", async () => {
    const response = await request(app).delete("/comments/" + commentId);
    expect(response.statusCode).toBe(200);
    const response2 = await request(app).get("/comments/" + commentId);
    expect(response2.statusCode).toBe(404);
  });

  test("Test Create Comment fail", async () => {
    const response = await request(app).post("/comments").send({
      content: "This is a comment 2",
      author: "David 2",
    });
    expect(response.statusCode).toBe(400);
  });
})