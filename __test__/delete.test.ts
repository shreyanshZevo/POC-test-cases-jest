// deleteUser.test.ts

import request from "supertest";
import app from "../src/index"; // Import your Express app instance

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      delete: jest.fn().mockImplementation((params) => {
        if (params.where.id === 1) {
          return { id: 1, name: "User 1" };
        } else {
          return null;
        }
      }),
    },
  })),
}));

describe("GET USERS BY ID /users/:id", () => {
  it("should return users by id from the database", async () => {
    const response = await request(app).delete("/users/1");

    expect(response.status).toBe(204);
    // expect(response.body).toEqual({
    //   status: "Success",
    //   user: { id: 1, name: "User 1" },
    // });
  });

  it("should return 404 if user with specified id is not found", async () => {
    // Assuming the user with ID 999 does not exist in your database
    const userId = 999;

    // Make a DELETE request to the delete user endpoint
    const response = await request(app).delete(`/users/${userId}`);

    // Assert that the response status code is 404 (Not Found)
    expect(response.status).toBe(404);
  });
});
