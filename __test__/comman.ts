import request from "supertest";
import { PrismaClient } from "@prisma/client";
import app from "../src/server"; // Assuming app is exported from your server file

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

const prisma = new PrismaClient();

describe("User API", () => {
  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser = { name: "John Doe", email: "john@example.com" };
      const response = await request(app).post("/users").send(newUser);
      expect(response.status).toBe(201);
      expect(response.body.newUser).toHaveProperty("id");
      expect(response.body.newUser.name).toBe(newUser.name);
      expect(response.body.newUser.email).toBe(newUser.email);
    });
  });

  describe("GET /users/:id", () => {
    it("should get user by id", async () => {
      const newUser = await prisma.user.create({
        data: { name: "Jane Doe", email: "jane@example.com" },
      });
      const response = await request(app).get(`/users/${newUser.id}`);
      expect(response.status).toBe(200);
      expect(response.body.user.name).toBe(newUser.name);
      expect(response.body.user.email).toBe(newUser.email);
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request(app).get("/users/9999999");
      expect(response.status).toBe(404);
    });
  });

  describe("PUT /users/:id", () => {
    it("should update user by id", async () => {
      const newUser = await prisma.user.create({
        data: { name: "Test User", email: "test@example.com" },
      });
      console.log(newUser);
      const updatedData = {
        name: "Updated User",
        email: "updated@example.com",
      };
      const response = await request(app)
        .put(`/users/${newUser.id}`)
        .send(updatedData);
      expect(response.status).toBe(200);
      expect(response.body.updateUser.name).toBe(updatedData.name);
      expect(response.body.updateUser.email).toBe(updatedData.email);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete user by id", async () => {
      const newUser = await prisma.user.create({
        data: { name: "Delete Me", email: "delete@example.com" },
      });
      const response = await request(app).delete(`/users/${newUser.id}`);
      expect(response.status).toBe(204);
    });
  });
});
