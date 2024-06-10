import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient();

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { name, email } = req.body;
  if (!id) {
    res.status(404).json({
      status: "failed",
      message: "id not found",
    });
  }
  try {
    const num = parseInt(id);
    const updatedUser = await prisma.user.update({
      where: {
        id: num,
      },
      data: {
        name: name,
        email: email,
      },
    });
    if (!updatedUser) {
      res.status(404).json({
        status: "Failure",
        message: "id not found",
      });
    }
    res.status(200).json({
      status: "Success",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { updateUser };
