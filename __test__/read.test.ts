import request from "supertest";
import app from "../src/index"; // Assuming your server file is named server.ts

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findMany: jest.fn().mockResolvedValue([
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ]),
      findFirst: jest.fn().mockImplementation((params) => {
        if (params.where.id === 1) {
          return { id: 1, name: "User 1" };
        } else {
          return null;
        }
      }),
    },
  })),
}));

describe("GET ALL USERS /users", () => {
  it("should return all users from the database", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "Success",
      users: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ],
    });
  });
});

describe("GET USERS BY ID /users/:id", () => {
  it("should return users by id from the database", async () => {
    const response = await request(app).get("/users/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "Success",
      user: { id: 1, name: "User 1" },
    });
  });
  it("should return 404 if user with specified id is not found", async () => {
    const nonExistentUserId = 9999; // Assuming user with ID 999 does not exist
    const response = await request(app).get(`/users/${nonExistentUserId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "Failed",
      message: "User not found",
    });
  });
});
