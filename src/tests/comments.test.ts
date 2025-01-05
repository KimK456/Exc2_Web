import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import { Express } from "express";

var app: Express;
const testComments = {
  comment: "This is a comment",
  owner: "KimK",
  postId: "6770f85905589a6c4159e0b1"
}

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await commentsModel.deleteMany();
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

//   test("Test Create Comment", async () => {
//     const response = await request(app).post("/comments").send({
//       comment: "This is a comment",
//       owner: "KimK",
//       postId: (await request(app).get("/posts?owner=TestOwner")).body[0]._id
//     });
//     expect(response.statusCode).toBe(201);
//     expect(response.body.comment).toBe(testComments.comment);
//     expect(response.body.postId).toBe(testComments.postId);
//     expect(response.body.owner).toBe(testComments.owner);
//     commentId = response.body._id;
//   });

//   test("Test get commenty by owner", async () => {
//     const response = await request(app).get("/comments?owner=" + testComments.owner);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBe(1);
//     expect(response.body[0].comment).toBe(testComments.comment);
//     expect(response.body[0].postId).toBe(testComments.postId);
//     expect(response.body[0].owner).toBe(testComments.owner);
//   });

//   test("Comments get comment by id", async () => {
//     const response = await request(app).get("/comments/" + commentId);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.comment).toBe(testComments.comment);
//     expect(response.body.postId).toBe(testComments.postId);
//     expect(response.body.owner).toBe(testComments.owner);
//   });
});