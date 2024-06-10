import request from "supertest";
import app from "../src/index"; // Assuming your server file is named server.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      }),
    },
  })),
}));

describe("POST CREATE USERS /users", () => {
  it("should create a user in db", async () => {
    const newUser = { name: "John Doe", email: "john@example.com" };
    const response = await request(app).post("/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      newUser: { id: 1, name: "John Doe", email: "john@example.com" },
      status: "Success",
    });
  });
});
