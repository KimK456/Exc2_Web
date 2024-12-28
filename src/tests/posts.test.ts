import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import { Express } from "express";

let app: Express;

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await postModel.deleteMany();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let postId = "";
describe("Posts Tests", () => {
  test("Test Get All Posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Post", async () => {
    const response = await request(app).post("/posts/").send({
      title: "Test Post",
      content: "Test Content",
      owner: "TestOwner",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test Post");
    expect(response.body.content).toBe("Test Content");
    expect(response.body.owner).toBe("TestOwner");
    postId = response.body._id;
  });

  test("Test Get Post By ID", async () => {
    const response = await request(app).get("/posts/post/" + postId);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Test Post");
    expect(response.body.content).toBe("Test Content");
    expect(response.body.owner).toBe("TestOwner");
  });

  test("Test Get Post By Owner", async () => {
    const response = await request(app).get("/posts?owner=TestOwner");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("Test Post");
    expect(response.body[0].content).toBe("Test Content");
    expect(response.body[0].owner).toBe("TestOwner");
  });

  test("Test Update Post By ID", async () => {
    const response = await request(app).put("/posts/post/" + postId).send({
      title: "Test Post - New Name",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test Post - New Name");
    expect(response.body.content).toBe("Test Content");
    expect(response.body.owner).toBe("TestOwner");
    postId = response.body._id;
  });


  test("Test Create Post 2", async () => {
    const response = await request(app).post("/posts").send({
      title: "Test Post 2",
      content: "Test Content 2",
      owner: "Test Owner 2",
    });
    expect(response.statusCode).toBe(201);
  });

  test("Posts test get all 2", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("Test create post fail", async () => {
    const response = await request(app).post("/posts/").send({
      title: "Test Post 2",
      content: "Test Content 2",
    });
    expect(response.statusCode).toBe(400);
  });
});