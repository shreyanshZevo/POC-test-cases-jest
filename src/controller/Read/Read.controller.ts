import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient();

const getALLUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const num = parseInt(id);

  const users = await prisma.user.findMany();

  return res.status(200).json({
    status: "Success",
    users,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const num = parseInt(id);

  if (!num) {
    return res.status(404).json({
      status: "Failed",
      message: "id not found",
    });
  }
  const user = await prisma.user.findFirst({
    where: {
      id: num,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: "Failed",
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: "Success",
    user,
  });
};

export { getALLUser, getUserById };
