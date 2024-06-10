import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient();

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "failed",
      message: "id not found",
    });
  }
  try {
    const num = parseInt(id);
    const deletedUser = await prisma.user.delete({
      where: {
        id: num,
      },
    });

    if (!deletedUser) {
      // User not found in the database, return null
      return res.status(404).json({
        status: "Failure",
        message: "User not found",
        deletedUser: null,
      });
    }

    // User successfully deleted from the database
    return res.status(204).json({
      status: "Success",
      deletedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete user", error });
  }
};

export { deleteUser };
