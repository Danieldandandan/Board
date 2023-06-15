const request = require("supertest");
const { User } = require("../../models/users.models");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const api = "/api/auth";
let server;

describe(api, () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await User.collection.deleteMany({});
  });
  describe("POST /", () => {
    it("should return 400 if invalid email entered", async () => {
      const body = {
        email: "abc",
        password: "123",
      };
      const res = await request(server).post(api).send(body);
      expect(res.status).toBe(400);
      // console.log(res);
    });
    it("should return 400 if email is not in the database", async () => {
      const body = {
        email: "abc@gmail.com",
        password: "123",
      };
      const res = await request(server).post(api).send(body);
      expect(res.status).toBe(400);
    });
    it("should return 400 if password is incorrect", async () => {
      const salt = await bcrypt.genSalt(10);
      const password = "abc@123";
      const hashed = await bcrypt.hash(password, salt);
      await User.collection.insertOne({ email: "u1@gmail", password: hashed });
      const body = {
        email: "abc@gmail.com",
        password: password,
      };
      const res = await request(server).post(api).send(body);
      expect(res.status).toBe(400);
    });
  });
});
