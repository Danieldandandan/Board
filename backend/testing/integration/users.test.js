const request = require("supertest");
const { User } = require("../../models/users.models");
const mongoose = require("mongoose");
const _ = require("lodash");

const api = "/api/users";
let server;
describe(api, () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await User.collection.deleteMany({});
  });
  describe("GET/", () => {
    it("should return all users", async () => {
      await User.collection.insertMany([
        { name: "user1", email: "u1@gmail" },
        { name: "user2", email: "u2@gmail" },
        { name: "user3", email: "u3@gmail" },
      ]);
      const res = await request(server).get(api);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((g) => g.name == "user1"));
      expect(res.body.some((g) => g.name == "user2"));
      expect(res.body.some((g) => g.name == "user3"));
    });
  });
  describe("POST", () => {
    it("should return 400 with invalid password", async () => {
      const user = {
        name: "danChu",
        email: "123@gmail.com",
        password: "122",
      };
      const res = await request(server).post(api).send(user);
      expect(res.status).toBe(400);
    });
    it("should return 400 with invalid email", async () => {
      const user = {
        name: "danChu",
        email: "123",
        password: "122@Csae1",
      };
      const res = await request(server).post(api).send(user);
      expect(res.status).toBe(400);
    });
    it("should return 400 with invalid name", async () => {
      const user = {
        name: "dan",
        email: "123@as.com",
        password: "122@Csae1",
      };
      const res = await request(server).post(api).send(user);
      expect(res.status).toBe(400);
    });
    it("should return 400 with a email that already used", async () => {
      User.collection.insertOne({
        name: "user1",
        email: "123@gmail.com",
      });
      const user = {
        name: "user2",
        email: "123@gmail.com",
        password: "123@Test1",
      };
      const res = await request(server).post(api).send(user);
      expect(res.status).toBe(400);
    });
    it("should return 200 with valid input", async () => {
      const user = {
        name: "user2",
        email: "123@gmail.com",
        password: "123@Test1",
      };
      const res = await request(server).post(api).send(user);
      expect(res.status).toBe(200);
      // console.log();
      expect(res.text).toBeDefined();
    });
  });
});
