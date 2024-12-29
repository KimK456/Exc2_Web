import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import userModel from "../models/users_model";
import { Express } from "express";

var app: Express;

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await userModel.deleteMany();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let userId = "";
describe("users Tests", () => {
  test("users test get all", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create user", async () => {
    const response = await request(app).post("/users").send({
      username: "Test user",
      email: "Test email"
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe("Test user");
    expect(response.body.email).toBe("Test email");
    userId = response.body._id;
  });

  test("Test get user by id", async () => {
    const response = await request(app).get("/users/" + userId);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe("Test user");
    expect(response.body.email).toBe("Test email");
  });

  test("Test Create user 2", async () => {
    const response = await request(app).post("/users").send({
      username: "Test user 2",
      email: "Test email 2"
    });
    expect(response.statusCode).toBe(201);
  });

  test("Test Delete user", async () => {
    const response = await request(app).delete("/users/" + userId);
    expect(response.statusCode).toBe(200);
    const response2 = await request(app).get("/users/" + userId);
    expect(response2.statusCode).toBe(404);
  });

  test("Test Create user fail", async () => {
    const response = await request(app).post("/users").send({
      title: "Test user 2",
      content: "Test Content 2",
    });
    expect(response.statusCode).toBe(400);
  });
});