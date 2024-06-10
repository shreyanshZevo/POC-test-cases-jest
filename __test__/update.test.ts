import request from "supertest";
import app from "../src/index"; // Assuming your server file is named server.ts

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      update: jest.fn().mockResolvedValue({
        id: 1,
        name: "Updated User",
        email: "s@gmail.com",
      }),
    },
  })),
}));

describe("UPDATE a single USER /users/:id", () => {
  it("should update a user", async () => {
    const userId = 1;
    const updatedUserData = { name: "Updated User", email: "s@gmail.com" };
    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "Success",
      updatedUser: { id: 1, name: "Updated User", email: "s@gmail.com" },
    });
  });
});
